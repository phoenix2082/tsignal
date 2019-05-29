from flask import Flask,  render_template, url_for, Response
import pandas as pd
from flask import jsonify
from flask import request

app = Flask(__name__)


@app.route("/msa")
def moving_average_crossover():
    sma = 20  # specify duration for short term moving average
    lma = 50  # specify duration for long term moving average

    dummysec = pd.read_csv('./dummysec.csv')

    dummysec['SMA'] = dummysec['Close Price'].rolling(sma).mean()
    dummysec['LMA'] = dummysec['Close Price'].rolling(lma).mean()
    dummysec['SMA2'] = dummysec['Close Price'].shift(1).rolling(sma).mean()
    dummysec['LMA2'] = dummysec['Close Price'].shift(1).rolling(lma).mean()

    # logic to generate 'buy' and 'sell' signals
    dummysec['Buy'] = dummysec.apply(lambda x: x['Close Price'] if x['SMA'] > x[
        'LMA'] and x['SMA2'] < x['LMA2'] else 0,
                                   axis=1)

    dummysec['Sell'] = dummysec.apply(lambda y: -y['Close Price'] if y['SMA'] <
                                    y['LMA'] and y['SMA2'] > y['LMA2'] else 0,
                                    axis=1)

    dsec = dummysec[(dummysec['Buy'] != 0.00) | (dummysec['Sell'] != 0.00)]
    result = dsec[['Close Price', 'Date', 'Buy', 'Sell']].to_json(orient='records') 
    return Response(result, mimetype='application/json')

@app.route('/smadates')
def get_sma_dates():

    dummysec = pd.read_csv('./dummydatatradesignal.csv')
    smadates = list(dummysec['date_of_trade'])
    return jsonify(smadates)

@app.route('/tsbyd2')
def get_trade_signal_by_date_from_csv():
    date_of_signal = request.args.get('red')
    dummysec = pd.read_csv('./dummydatatradesignal.csv')
    print(dummysec.info())
    result = dummysec[dummysec['date_of_trade'] == date_of_signal].to_json(orient='records') 
    return Response(result, mimetype='application/json')

@app.route("/")
def index():
    return render_template("index.html")

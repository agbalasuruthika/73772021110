from flask import Flask, jsonify, request
import requests

app = Flask(_name_)

@app.route('/numbers')
def get_numbers():
    urls = request.args.getlist('url')

    numbers = []
    for url in urls:
        try:
            response = requests.get(url)
            if response.status_code == 200:
                data = response.json()
                numbers.extend(data.get('numbers', []))
        except requests.exceptions.RequestException:
            pass

    return jsonify({'numbers': numbers})

if _name_ == '_main_':
    app.run(host='0.0.0.0', port=8008)
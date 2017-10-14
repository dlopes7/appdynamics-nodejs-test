from appdynamics.agent import api as appd

appd.init(timeout_ms=60000)

import requests
import random
import json
import time


def post():
    bt = appd.start_bt("Post Product")
    products = ["apple",
                "orange",
                "mac",
                "keyboard",
                "mouse",
                "car",
                "tv",
                "human",
                "sex",
                "noidea",
                "maybe",
                "product",
                "thing",
                "legs",
                "shorts",
                "window",
                "sky"]

    try:
        data = {
            "name": random.choice(products),
            "price": float(random.uniform(15.0, 999.99))
        }

        r = requests.post("http://localhost:3000/products", data=data)
        print(r.json())
    except:
        pass

    appd.end_bt(bt)


def get():
    bt = appd.start_bt("Get Product")
    try:
        r = requests.get("http://localhost:3000/products")
        print(r.json())
    except:
        pass

    appd.end_bt(bt)


if __name__ == "__main__":
    while True:
        post()
        get()
        time.sleep(random.uniform(1.0, 3.0))

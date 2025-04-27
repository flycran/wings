from enum import Enum

from fastapi import FastAPI

from api import docs_host

docs_host.monkey_patch()

app = FastAPI()


@app.get("/")
def read_root():
    return "Next and FastAPI demo2122"


class ModelName(str, Enum):
    alexnet = "alexnet"
    resnet = "resnet"
    lenet = "lenet"


@app.get("/items/{item_id}")
def read_item(item_id: int, q: ModelName | None = None):
    return {"item_id": item_id, "q": q}

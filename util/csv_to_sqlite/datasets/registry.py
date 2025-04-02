from . import kaggle_car_prices

DATASET_REGISTRY = {
    "kaggle-car-prices": kaggle_car_prices,
}


def get_dataset_schema(dataset_name: str):
    if dataset_name not in DATASET_REGISTRY:
        raise ValueError(f"Unknown dataset: {dataset_name}")
    return DATASET_REGISTRY[dataset_name].get_schema()

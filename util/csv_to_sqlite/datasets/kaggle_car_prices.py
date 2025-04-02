expected_columns = [
    "Make",
    "Model",
    "Year",
    "Engine Fuel Type",
    "Engine HP",
    "Engine Cylinders",
    "Transmission Type",
    "Driven_Wheels",
    "Number of Doors",
    "Market Category",
    "Vehicle Size",
    "Vehicle Style",
    "highway MPG",
    "city mpg",
    "Popularity",
    "MSRP",
]


def get_schema():
    return {col: "str" for col in expected_columns}  # Simplified example

import argparse
from pathlib import Path
from . import core
from .datasets.registry import get_dataset_schema, DATASET_REGISTRY


def infer_dataset_name_from_path(path: str) -> str:
    p = Path(path)
    parts = [p.stem.lower()] + [part.lower() for part in p.parts]

    for name in DATASET_REGISTRY.keys():
        if name.lower() in parts:
            return name
    raise ValueError(
        "Dataset name could not be inferred from path. Please provide --dataset explicitly."
    )


def main():
    parser = argparse.ArgumentParser(
        description="Import a CSV into a local SQLite3 database."
    )
    parser.add_argument("csv_path", help="Path to the CSV file.")
    parser.add_argument("--db", default="local.db", help="Path to the SQLite database.")
    parser.add_argument("--table", required=True, help="Target table name.")
    parser.add_argument(
        "--dataset", help="Optional dataset name (e.g. 'kaggle-car-prices')."
    )
    parser.add_argument(
        "--describe",
        action="store_true",
        help="Print dataset shape/schema without inserting.",
    )

    args = parser.parse_args()

    dataset_name = args.dataset or infer_dataset_name_from_path(args.csv_path)
    df = core.load_csv_to_dataframe(args.csv_path)

    if args.describe:
        print(f"Dataset: {dataset_name}")
        print(f"Shape: {df.shape}")
        print("Schema (inferred):")
        for col, dtype in core.infer_schema(df).items():
            print(f"  {col}: {dtype}")
        expected_schema = get_dataset_schema(dataset_name)
        print("\nExpected Schema:")
        for col, dtype in expected_schema.items():
            print(f"  {col}: {dtype}")
    else:
        core.insert_dataframe_to_sqlite(df, args.db, args.table)


if __name__ == "__main__":
    main()

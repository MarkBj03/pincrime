import csv
import json

# Input and output file paths
csv_file = "updatedrizalcrime.csv"  
geojson_file = "crime_data.geojson"

# Initialize GeoJSON structure
geojson = {
    "type": "FeatureCollection",
    "features": []
}

# Initialize a dictionary to count the incident types
incident_count = {}

# Read the CSV and convert to GeoJSON
try:
    with open(csv_file, newline='', encoding='latin1') as csvfile:  # Use 'latin1' encoding to handle invalid characters
        reader = csv.DictReader(csvfile)
        for row in reader:
            try:
                # Validate latitude and longitude
                lat = float(row["LATITUDE"])
                lon = float(row["LONGITUDE"])

                # Get the incident type
                incident_type = row["INCIDENT TYPE"]

                # Update the count for the incident type
                if incident_type in incident_count:
                    incident_count[incident_type] += 1
                else:
                    incident_count[incident_type] = 1

                # Create a GeoJSON feature for each valid row
                feature = {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [lon, lat]
                    },
                    "properties": {
                        "station": row["STATION"],
                        "province": row["PROVINCE"],
                        "city": row["CITY"],
                        "barangay": row["BARANGAY"],
                        "incident_type": incident_type
                    }
                }
                geojson["features"].append(feature)

            except ValueError as e:
                # Skip rows with invalid latitude/longitude
                print(f"Skipping row due to error: {e}. Row data: {row}")
            except KeyError as e:
                # Skip rows with missing expected columns
                print(f"Missing column: {e}. Row data: {row}")

    # Write the GeoJSON to a file
    with open(geojson_file, "w", encoding="utf-8") as f:
        json.dump(geojson, f, indent=4)

    print(f"GeoJSON data has been saved to {geojson_file}")

    # Print the incident type counts
    print("\nIncident Type Counts:")
    for incident, count in incident_count.items():
        print(f"{incident}: {count}")

except Exception as e:
    print(f"An error occurred: {e}")

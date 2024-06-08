import pandas as pd
import psycopg2
from psycopg2 import sql

# Read the excel file
df = pd.read_excel('C:\\Users\\P1357911\\Desktop\\TimeLog\\frontend\\backend\\db\\SampleData.xlsx')
# Establish a connection to the PostgreSQL database
conn = psycopg2.connect(
    host='localhost',
    port='5432',
    dbname='timelog',
    user='user1',
    password='1234'
)

# Create a cursor object
cur = conn.cursor()

# Iterate over the DataFrame rows
for index, row in df.iterrows():
    # Replace missing values with None
    row = row.where(pd.notnull(row), None)

    # Construct the INSERT query
    query = sql.SQL("INSERT INTO timelog VALUES ({})").format(
        sql.SQL(', ').join(sql.Placeholder() for _ in row)
    )

    # Execute the query
    cur.execute(query, tuple(row))

# Commit the transaction
conn.commit()

# Close the cursor and connection
cur.close()
conn.close()
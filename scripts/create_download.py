import functools

csv_file = '/PATH/TO/CSV'
output_file = './download.py'

redacted_header_idx = 3     # headers from back to redact

def load_data(path):
    f=open(csv_file, "r")
    lines = f.readlines()
    headers = lines[0].split(',')[:-redacted_header_idx]
    rows = [line.split(',') for line in lines]
    f.close()
    return [headers, rows]

def get_col(data, idx):
    return map(lambda d : float(d[idx]), data)

def get_summary_counts(headers, rows):
    # Skip the index column
    summary_counts = []
    for idx in range(1,len(headers)):
        if(rows[1][idx].replace('.', '', 1).isdigit()):
            col = sum(get_col(rows[1:], idx))
            summary_counts.append(col)
    return summary_counts

def get_proportions(counts):
    total = sum(counts)
    return map(lambda r : r/total, counts)

def find_row(rows, id):
    for row in rows:
        if(id == int(row[0])):
            values_str = row[1:-redacted_header_idx]        # (index, redacted_headers)
            values_flt = map(lambda v : float(v), values_str)
            values_flt.insert(0, id)
            return values_flt
    return []

def make_line(list):
    return str(list).lstrip('[').rstrip(']') + '\n'

def write_file(headers, summary, record):
    summary.insert(0,'summary')

    open(output_file, 'w').close()
    f = open(output_file, "a")
    f.write(make_line(headers))
    f.write(make_line(summary))
    f.write(make_line(record))
    f.close()

if __name__ == '__main__':
    [headers, rows] = load_data(csv_file)
    summary_counts = get_summary_counts(headers, rows)
    summary_counts.insert(0, 'summary')
    assert len(headers) == len(summary_counts)

    file_contents = {}
    file_contents['headers'] = headers
    file_contents['summary'] = summary_counts
    file_contents['data'] = {}

    for record in range(1000, 1145):
        file_contents['data'][record] = find_row(rows[1:], record)
        # No data for the following IDs
        if record not in [1040, 1118, 1119, 1120]:
            assert len(file_contents['data'][record]) == len(summary_counts)

    open(output_file, 'w').close()
    f = open(output_file, "a")
    f.write('data = ' + str(file_contents))
    f.close()

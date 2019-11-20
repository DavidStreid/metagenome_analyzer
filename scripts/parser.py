csv_file = '../src/test_data/fastq/efe9d910-8fe1-4cac-a0b7-015505f715ed/data/level-7.csv'
output_file = './swab_n_seq_results.py'
f=open(csv_file, "r")

lines = f.readlines()
headers_raw = lines[0].split(',')
headers = []



for h in headers_raw:
	taxonomy = {}
	hsplit = h.split(';')
	for tval in hsplit:
		tsplit = tval.split('__')
		if(len(tsplit) > 1):
			taxonomy[tsplit[0]] = tsplit[1]
	headers.append(taxonomy)


samples = {}

taxonomic_keys = ['k', 'p', 'c', 'o', 'f', 'g', 's']
summary = {}
for k in taxonomic_keys:
	summary[k] = {}

for l in lines[1:]:
	vals = l.split(',')
	sample = vals[0]
	orgs = []
	for i in range(1,len(headers)):
		v = vals[i]
		try:
			count = float(v)
			org = headers[i]


			keys = filter(lambda k: k != '', org.keys())
			for k in keys:
				lvl = org[k]
				if lvl in summary[k]:
					summary[k][lvl] += count
				elif lvl != '':
					summary[k][lvl] = count
			if count > 0:
				# Only add to individual results for non-0 counts
				entry = { 'org': org, 'count': count }		
				orgs.append(entry)
		except ValueError:
			pass
	samples[sample] = orgs

f.close()


summary_list = {}
for k in summary:
	lst = []

	# TODO - reduce values and label all orgs below a certain count as 'other'
	for org in summary[k].keys():
		entry = { 'org': { k: org }, 'count': summary[k][org] }
		lst.append(entry)
	summary_list[k] = lst

data  = {
	'results': samples,
	'summary': summary_list
}


open(output_file, 'w').close()
f = open(output_file, "a")
f.write('data = ' + str(data))
f.close()




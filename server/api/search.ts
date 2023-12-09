export default defineEventHandler(async (event) => {
  interface Result {
    result_count: number;
    results: SearchResult[];
  }

  const body = await readBody(event);
  const searchParams = new URLSearchParams(body.formData).toString();
  let url = `https://npiregistry.cms.hhs.gov/api/?version=2.1&limit=${body.paging}&${searchParams}`;

  if (body.page > 1) {
    url += `&skip=${(body.page - 1) * body.paging}`;
  }

  const data: Result = await $fetch(url, {
    method: 'GET',
  });

  let results: SearchResult[] = [];
  if (data) {
    results = data.results;

    for(let i = 0; i < results.length; i++) {
      const result = results[i];
      let addresses = {};

      result.addresses.forEach((address) => {
        addresses[address.address_purpose.toLowerCase()] = address;
      });

      results[i].addresses = addresses;
    }
  }

  return {
    results: results,
  };
})

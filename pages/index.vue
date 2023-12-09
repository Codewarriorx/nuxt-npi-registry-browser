<template>
  <div class="container mx-auto">
    <h2>
      <Icon name="mdi:text-box-search-outline" />
      NPI Search
    </h2>

    <p class="alert error" v-if="errorMsg">
      <Icon name="mdi:alert-circle-outline" class="w-10 h-10 mr-3" />
      {{ errorMsg }}
    </p>

    <Form v-on:submit="handleForm" v-bind:validation-schema="searchSchema">
      <div class="grid grid-col-1 md:grid-cols-5 gap-5">
        <div class="md:col-span-2">
          <label for="number">NPI Number</label>
          <Field type="number" id="number" name="number" min="0" maxlength="10" />
          <ErrorMessage as="small" class="validation-error" name="number" />
        </div>

        <div class="md:col-span-3">
          <label for="taxonomy_description">Taxonomy Description</label>
          <Field type="text" id="taxonomy_description" name="taxonomy_description" />
          <ErrorMessage as="small" class="validation-error" name="taxonomy_description" />
        </div>
      </div>

      <div class="grid grid-col-1 md:grid-cols-2 gap-5">
        <div>
          <label for="first_name">First Name</label>
          <Field type="text" id="first_name" name="first_name" />
          <ErrorMessage as="small" class="validation-error" name="first_name" />
        </div>

        <div>
          <label for="last_name">Last Name</label>
          <Field type="text" id="last_name" name="last_name" />
          <ErrorMessage as="small" class="validation-error" name="last_name" />
        </div>
      </div>

      <div class="grid grid-col-2 md:grid-cols-5 gap-5">
        <div class="col-span-2">
          <label for="city">City</label>
          <Field type="text" id="city" name="city" placeholder="City" />
          <ErrorMessage as="small" class="validation-error" name="city" />
        </div>

        <div class="col-span-1 md:col-span-2">
          <label for="state">State</label>
          <Field id="state" name="state" as="select"
            class="capitalize">
            <option value="">any</option>
            <option value="AL">alabama</option>
            <option value="AK">alaska</option>
            <option value="AS">american samoa</option>
            <option value="AZ">arizona</option>
            <option value="AR">arkansas</option>
            <option value="AA">armed forces america</option>
            <option value="AE">armed forces europe/canada/middle east/africa</option>
            <option value="AP">armed forces pacific</option>
            <option value="CA">california</option>
            <option value="CO">colorado</option>
            <option value="CT">connecticut</option>
            <option value="DE">delaware</option>
            <option value="DC">district of columbia</option>
            <option value="FL">florida</option>
            <option value="GA">georgia</option>
            <option value="GU">guam</option>
            <option value="HI">hawaii</option>
            <option value="ID">idaho</option>
            <option value="IL">illinois</option>
            <option value="IN">indiana</option>
            <option value="IA">iowa</option>
            <option value="KS">kansas</option>
            <option value="KY">kentucky</option>
            <option value="LA">louisiana</option>
            <option value="ME">maine</option>
            <option value="MP">mariana islands, northern</option>
            <option value="MH">marshall islands</option>
            <option value="MD">maryland</option>
            <option value="MA">massachusetts</option>
            <option value="MI">michigan</option>
            <option value="FM">micronesia, federated states of</option>
            <option value="MN">minnesota</option>
            <option value="MS">mississippi</option>
            <option value="MO">missouri</option>
            <option value="MT">montana</option>
            <option value="NE">nebraska</option>
            <option value="NV">nevada</option>
            <option value="NH">new hampshire</option>
            <option value="NJ">new jersey</option>
            <option value="NM">new mexico</option>
            <option value="NY">new york</option>
            <option value="NC">north carolina</option>
            <option value="ND">north dakota</option>
            <option value="OH">ohio</option>
            <option value="OK">oklahoma</option>
            <option value="OR">oregon</option>
            <option value="PA">pennsylvania</option>
            <option value="PR">puerto rico</option>
            <option value="RI">rhode island</option>
            <option value="SC">south carolina</option>
            <option value="SD">south dakota</option>
            <option value="TN">tennessee</option>
            <option value="TX">texas</option>
            <option value="UT">utah</option>
            <option value="VT">vermont</option>
            <option value="VI">virgin islands</option>
            <option value="VA">virginia</option>
            <option value="WA">washington</option>
            <option value="WV">west virginia</option>
            <option value="WI">wisconsin</option>
            <option value="WY">wyoming</option>
          </Field>
          <ErrorMessage as="small" class="validation-error" name="state" />
        </div>

        <div>
          <label for="postal_code">Postal Code</label>
          <Field type="number" id="postal_code" name="postal_code" maxlength="5" min="0" />
          <ErrorMessage as="small" class="validation-error" name="postal_code" />
        </div>
      </div>

      <button type="button"
        class="button button-outline mr-2"
        :class="{ 'cursor-progress': isLoading }"
        v-on:click="reset"
        :disabled="isLoading">
        Reset
      </button>
      <button type="submit" class="button"
        :class="{ 'cursor-progress': isLoading }"
        :disabled="isLoading">
        <Icon name="mdi:account-search-outline" class="w-6 h-6" />
        Search
      </button>
    </form>

    <div v-if="results">
      <h2 id="results">
        <Icon name="mdi:list-box-outline" />
        Results
        <small>
          ({{ results.length }})
        </small>

        <div class="float-right">
          <select id="paging"
            name="paging"
            v-model="paging">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="200">200</option>
          </select>
        </div>
      </h2>

      <p>List of NPI(s) that match your search. View more information by selecting a row.</p>

      <table>
        <thead>
          <tr>
            <th class="text-center">NPI</th>
            <th>Name</th>
            <th class="text-center">Type</th>
            <th>Address</th>
            <th class="text-center hidden md:table-cell">Phone</th>
            <th class="text-center hidden md:table-cell">Taxonomy</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="result in results" :key="result.number"
            v-on:click="activeRecord = result"
            class="cursor-pointer">
            <td class="text-center">
              <SkeletonElement :is-loading="isLoading">
                {{ result.number }}
              </SkeletonElement>
            </td>
            <td>
              <SkeletonElement :is-loading="isLoading">
                <template v-if="result.enumeration_type == 'NPI-1'">
                  {{ result.basic.last_name }}, {{ result.basic.first_name }}
                </template>
                <template v-else>
                  {{ result.basic.organization_name }}
                </template>
              </SkeletonElement>
            </td>
            <td class="text-center">
              <SkeletonElement :is-loading="isLoading">
                <template v-if="result.enumeration_type == 'NPI-1'">
                  <Icon name="mdi:account" />
                </template>
                <template v-else>
                  <Icon name="mdi:hospital-building" />
                </template>
              </SkeletonElement>
            </td>
            <td>
              <SkeletonElement :is-loading="isLoading">
                {{ result.addresses.location.address_1 }}
                {{ result.addresses.location.address_2 }}
                {{ result.addresses.location.city }},
                {{ result.addresses.location.state }}
                {{ result.addresses.location.postal_code.substring(0, 5) }}-{{ result.addresses.location.postal_code.substring(5) }}
              </SkeletonElement>
            </td>
            <td class="hidden md:table-cell">
              <SkeletonElement :is-loading="isLoading">
                {{ result.addresses.location.telephone_number }}
              </SkeletonElement>
            </td>
            <td class="hidden md:table-cell">
              <SkeletonElement :is-loading="isLoading">
                {{ result.taxonomies[0].desc }}
              </SkeletonElement>
            </td>
          </tr>
          <tr v-if="results && results.length === 0">
            <td colspan="6" class="text-center">
              <SkeletonElement :is-loading="isLoading">
                No results found
              </SkeletonElement>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="grid grid-cols-2">
        <div>
          <a href="#results" class="button button-outline cursor-pointer"
            v-on:click="page--"
            v-if="page > 1"
            :class="{ 'cursor-progress': isLoading }"
            :disabled="isLoading">
            <Icon name="mdi:chevron-left" />
            Previous
          </a>
        </div>
        <div>
          <a href="#results" class="button button-outline cursor-pointer float-right"
            v-on:click="page++"
            v-if="results.length == paging && paging * page < 1200"
            :class="{ 'cursor-progress': isLoading }"
            :disabled="isLoading">
            Next
            <Icon name="mdi:chevron-right" />
          </a>
        </div>
      </div>
    </div>

    <Modal v-bind:is-open="!!activeRecord" v-on:close-modal="activeRecord = null">
      <template v-slot:title>
        Provider Information for {{ activeRecord?.number }}
      </template>

      <template v-if="activeRecord">
        <h4>
          <Icon name="mdi:account" v-if="activeRecord.enumeration_type == 'NPI-1'" />
          <Icon name="mdi:hospital-building" v-else />

          <template v-if="activeRecord.enumeration_type == 'NPI-1'">
            {{ activeRecord.basic.first_name }}
            {{ activeRecord.basic.last_name }}

            {{ activeRecord.basic.credential }}
          </template>
          <template v-else>
          {{ activeRecord.basic.organization_name }}
          </template>

          <small class="text-slate-400 block">
            <span class="font-semibold">Last Updated:</span> {{ activeRecord.basic.last_updated }}
          </small>
          <small class="text-slate-400 block">
            <span class="font-semibold">Certification Date:</span> {{ activeRecord.basic.enumeration_date }}
          </small>
        </h4>

        <dl class="grid grid-cols-12 gap-4 mb-0">
          <dt class="col-span-4 text-end">NPI</dt>
          <dd class="col-span-8">{{ activeRecord.number }}</dd>

          <dt class="col-span-4 text-end">Enumeration Date</dt>
          <dd class="col-span-8">{{ activeRecord.basic.enumeration_date }}</dd>

          <dt class="col-span-4 text-end">NPI Type</dt>
          <dd class="col-span-8">{{ activeRecord.enumeration_type }}</dd>

          <template v-if="activeRecord.basic.sole_proprietor">
            <dt class="col-span-4 text-end">Sole Proprietor</dt>
            <dd class="col-span-8">{{ activeRecord.basic.sole_proprietor }}</dd>
          </template>

          <dt class="col-span-4 text-end">Status</dt>
          <dd class="col-span-8">
            <template v-if="activeRecord.basic.status == 'A'">
              Active
            </template>
            <template v-else>
              Inactive
            </template>
          </dd>

          <template v-if="activeRecord.enumeration_type == 'NPI-2'">
            <dt class="col-span-4 text-end">Authorized Official Information</dt>
            <dd class="col-span-8">
              <span class="block">
                <strong>Name: </strong>
                {{ activeRecord.basic.authorized_official_first_name }}
                {{ activeRecord.basic.authorized_official_middle_name }}
                {{ activeRecord.basic.authorized_official_last_name }}
                {{ activeRecord.basic.authorized_official_credential }}
              </span>
              <span class="block">
                <strong>Title: </strong>
                {{ activeRecord.basic.authorized_official_title_or_position }}
              </span>
              <span class="block">
                <strong>Phone: </strong>
                {{ activeRecord.basic.authorized_official_telephone_number }}
              </span>
            </dd>
          </template>

          <dt class="col-span-4 text-end">Mailing Address</dt>
          <dd class="col-span-8">
            <Address v-bind:address="activeRecord.addresses.mailing" />
          </dd>

          <dt class="col-span-4 text-end">Primary Practice Address</dt>
          <dd class="col-span-8">
            <Address v-bind:address="activeRecord.addresses.location" />
          </dd>

          <template v-if="activeRecord.practiceLocations.length">
            <dt class="col-span-4 text-end">Secondary Practice Addresses</dt>
            <dd class="col-span-8">
              <template v-for="(practiceLocation, idx) in activeRecord.practiceLocations">
                <Address v-bind:address="practiceLocation" />

                <template v-if="idx < activeRecord.practiceLocations.length - 1">
                  <hr>
                </template>
              </template>
            </dd>
          </template>

          <template v-if="activeRecord.identifiers.length">
            <dt class="col-span-4 text-end">Other Identifiers</dt>
            <dd class="col-span-8">
              <table class="table table-striped table-hover align-middle">
                <thead>
                  <tr>
                    <th>Issuer</th>
                    <th>State</th>
                    <th>Number</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="identifier in activeRecord.identifiers">
                    <td>
                      {{ identifier.desc }}
                    </td>
                    <td>
                      {{ identifier.state }}
                    </td>
                    <td>
                      {{ identifier.identifier }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </dd>
          </template>

          <dt class="col-span-4 text-end">Taxonomy</dt>
          <dd class="col-span-8">
            <table class="table table-striped table-hover align-middle">
              <thead>
                <tr>
                  <th>Primary Taxonomy</th>
                  <th>Selected Taxonomy</th>
                  <th>State</th>
                  <th>License Number</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="taxonomy in activeRecord.taxonomies">
                  <td>
                    <template v-if="taxonomy.primary">
                      Yes
                    </template>
                    <template v-else>
                      No
                    </template>
                  </td>
                  <td>
                    {{ taxonomy.code + ' - ' + taxonomy.desc }}
                  </td>
                  <td>
                    {{ taxonomy.state }}
                  </td>
                  <td>
                    {{ taxonomy.license }}
                  </td>
                </tr>
              </tbody>
            </table>
          </dd>

          <template v-if="activeRecord.endpoints.length">
            <dt class="col-sm-12">Health Information Exchange</dt>
            <dd class="col-sm-12">
              <table class="table table-striped table-hover align-middle table-responsive">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Endpoint</th>
                    <th>Description</th>
                    <th>Use</th>
                    <th>Content Type</th>
                    <th>Affiliation</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="endpoint in activeRecord.endpoints">
                    <td>
                      {{ endpoint.endpointTypeDescription }}
                    </td>
                    <td>
                      <a href="{{ endpoint.endpoint }}" target="_blank">
                        Endpoint
                      </a>
                    </td>
                    <td>
                      {{ endpoint.endpointDescription ?? '' }}
                    </td>
                    <td>
                      {{ endpoint.useOtherDescription }}
                    </td>
                    <td>
                      {{ endpoint.contentTypeDescription }}
                    </td>
                    <td>
                      {{ endpoint.affiliation }}
                    </td>
                    <td>
                      <Address v-bind:address="endpoint" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </dd>
          </template>
        </dl>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
import { object, number, string, ObjectSchema } from 'yup';

let lastFormData: object | null = null;
let errorMsg = ref('');
let results: Ref<Array<SearchResult>|null> = ref(null);
let paging = ref(50);
let page = ref(1);
let isLoading = ref(false);
let activeRecord: Ref<SearchResult|null> = ref(null);

interface SearchSchema {
  number: number | null | undefined;
  taxonomy_description: string | null | undefined;
  first_name: string | null | undefined;
  last_name: string | null | undefined;
  city: string | null | undefined;
  state: string | null | undefined;
  postal_code: number | null | undefined;
}

interface SearchData {
  formData: object;
  page: number;
  paging: number;
}

const searchSchema: ObjectSchema<SearchSchema> = object({
  number: number()
    .transform((val, origVal) => { return origVal === '' ? null : val; })
    .min(0)
    .max(9999999999)
    .nullable()
    .optional()
    .typeError('This must be a number')
    .label('NPI Number'),
  taxonomy_description: string()
    .trim()
    .max(256)
    .nullable()
    .optional()
    .label('Taxonomy Description'),
  first_name: string()
    .trim()
    .max(256)
    .nullable()
    .optional()
    .label('First Name'),
  last_name: string()
    .trim()
    .max(256)
    .nullable()
    .optional()
    .label('Last Name'),
  city: string()
    .trim()
    .max(256)
    .nullable()
    .optional()
    .label('City'),
  state: string()
    .trim()
    .max(2)
    .nullable()
    .optional()
    .label('State'),
  postal_code: number()
    .transform((val, origVal) => { return origVal === '' ? null : origVal; })
    .min(2)
    .max(99999)
    .nullable()
    .optional()
    .typeError('This must be a number')
    .label('Postal Code'),
});

function updateResults() {
  if (lastFormData) {
    search({
      formData: lastFormData,
      page: page.value,
      paging: paging.value,
    });
  }
}

watch(page, (newPage, oldPage) => updateResults());
watch(paging, (newPaging, oldPaging) => {
  if (page.value > 1) {
    const resultCount = (page.value - 1) * oldPaging;
    page.value = (resultCount / paging.value) + 1;
  } else {
    updateResults();
  }
});

function handleForm(formData: SearchSchema) {
  resetState();

  for (const key in formData) {
    if (!formData[key]) {
      delete formData[key];
    }
  }

  if (Object.entries(formData).length === 0) {
    errorMsg.value = 'Please enter at least one search parameter.';
    return;
  }

  // state can't be used on it's own
  if (typeof formData.state !== 'undefined' && Object.entries(formData).length === 1) {
    errorMsg.value = 'State must be used with another search parameter.';
    return;
  }

  lastFormData = formData;

  search({
    formData: formData,
    page: page.value,
    paging: paging.value,
  });
}

async function search(searchData: SearchData) {
  isLoading.value = true;
  const { data, error } = await useFetch('/api/search', {
    method: 'POST',
    body: searchData
  });

  if (error.value) {
    console.error(error.value);
    errorMsg.value = 'Something went wrong, please try again in a few minutes.';
    return;
  }

  if (data.value) {
    results.value = data.value.results;
  }

  isLoading.value = false;
}

function reset(e: PointerEvent) {
  ((e.target as HTMLInputElement).parentNode as HTMLFormElement)?.reset();

  resetState();
}

function resetState() {
  activeRecord.value = null;
  results.value = null;
  lastFormData = null;
  errorMsg.value = '';
  page.value = 1;
}
</script>
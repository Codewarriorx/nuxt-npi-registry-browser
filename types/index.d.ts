interface SearchResult {
  created_epoch: string;
  enumeration_type: 'NPI-1' | 'NPI-2';
  last_updated_epoch: string;
  number: string;
  addresses: Address[];
  practiceLocations: Address[];
  basic: BasicInfo;
  taxonomies: Taxonomies[];
  identifiers: Identifiers[];
  endpoints: Endpoint[];
  other_names: OtherNames[];
}

interface Address {
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postal_code: string;
  country_code: string;
  telephone_number: string;
  fax_number: string;
  address_purpose: 'MAILING' | 'LOCATION';
}

interface Taxonomies {
  code: string;
  license: string;
  state: string;
  primary: boolean;
  desc: string;
}

interface Identifiers {
  identifier: string;
  code: string;
  state: string;
  issuer: string;
  desc: string;
}

interface OtherNames {
  organization_name: string;
  code: string;
}

interface BasicInfo {
  first_name: string;
  last_name: string;
  organization_name: string;
  credential: string;
  sole_proprietor: string;
  gender: string;
  enumeration_date: string;
  last_updated: string;
  status: string;
  name_prefix: string;

  authorized_official_first_name: string;
  authorized_official_middle_name: string;
  authorized_official_last_name: string;
  authorized_official_credential: string;
  authorized_official_title_or_position: string;
  authorized_official_telephone_number: string;
  parent_organization_legal_business_name: string;
  parent_organization_ein: string;
  authorized_official_name_prefix: string;
  authorized_official_name_suffix: string;
}

interface Endpoint {
  endpointType: string;
  endpointTypeDescription: string;
  endpoint: string;
  affiliation: string;
  endpointDescription: string;
  affliationName: string;
  use: string;
  useDescription: string;
  useOtherDescription: string;
  contentType: string;
  contentTypeDescription: string;
  contentOtherDescription: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  country_code: string;
  postal_code: string;
  country_name: string;
  address_type: 'DOM' | 'FGN' | 'MIL';
}
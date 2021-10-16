import Client from 'fhir-kit-client';
import dotenv from 'dotenv';

dotenv.config();

const fhirClient = new Client({ baseUrl: process.env.FHIR_API || '' });

export default fhirClient;

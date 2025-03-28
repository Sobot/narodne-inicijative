import { transliterate } from 'transliteration';
import municipalityContacts from '@/data/opstineKontakti.json';

export interface MunicipalityContact {
  position: string;
  name: string | null;
  email: string;
  phone: string | null;
  web: string | null;
}

export function findMunicipalityContacts(cyrillicMunicipality: string): MunicipalityContact[] {
  const latinMunicipality = transliterate(cyrillicMunicipality);
  
  const municipality = municipalityContacts.municipalities.find(
    m => transliterate(m.name.toLowerCase()) === latinMunicipality.toLowerCase()
  );

  return municipality?.contacts || [];
}

export function getPresidentEmail(contacts: MunicipalityContact[]): string | null {
  const president = contacts.find(c => c.position === 'predsednik opštine');
  return president?.email || null;
}

export function getOtherContacts(contacts: MunicipalityContact[]): MunicipalityContact[] {
  return contacts.filter(c => c.position !== 'predsednik opštine');
} 
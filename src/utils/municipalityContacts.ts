import municipalityContacts from '@/data/opstineKontakti.json';

export interface MunicipalityContact {
  position: string;
  name: string | null;
  email: string;
  phone: string | null;
  web: string | null;
}

export function findMunicipalityContacts(cyrillicMunicipality: string): MunicipalityContact[] {
  const municipality = municipalityContacts.find(
    m => m["Назив јединице локалне самоуправе"].toLowerCase() === cyrillicMunicipality.toLowerCase()
  );

  if (!municipality) return [];

  return [
    {
      position: "Председник општине",
      name: municipality["Име и презиме градоначелника/ председника општине"] || null,
      email: municipality["Email адреса градоначелника/председника општине"] || "",
      phone: municipality["Контакт телефон градоначелника/председника општине"] || null,
      web: null
    },
    {
      position: "Председник скупштине",
      name: municipality["Име и презиме председника скупштине"] || null,
      email: municipality["Email адреса председника скупштине"] || "",
      phone: municipality["Контакт телефон председника скупштине"] || null,
      web: null
    },
    {
      position: "Начелник општинске управе",
      name: municipality["Име и презиме начелника општинске/градске управе"] || null,
      email: municipality["Email адреса начелника општинске/градске управе"] || "",
      phone: municipality["Контакт телефон начелника општинске/градске управе"] || null,
      web: null
    }
  ].filter(contact => contact.email !== "");
}

export function getPresidentEmail(contacts: MunicipalityContact[]): string | null {
  const president = contacts.find(c => c.position === "Председник општине");
  return president?.email || null;
}

export function getOtherContacts(contacts: MunicipalityContact[]): MunicipalityContact[] {
  return contacts.filter(c => c.position !== "Председник општине");
} 
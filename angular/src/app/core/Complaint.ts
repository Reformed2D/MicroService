export class Complaint {
  idComp?: number;
  description: string;
  typeRec: TypeRec;
  dateComplaint: Date;
  name: string;
  lastname: string;
  email: string;
  status: string;
  message :String;
 
}

export enum TypeRec {
  ACCESS_TO_INTERNSHIP_OPPORTUNITIES = 'ACCESS_TO_INTERNSHIP_OPPORTUNITIES',
  APPLICATION_PROCESS = 'APPLICATION_PROCESS',
  MONITORING_OF_INTERNSHIPS = 'MONITORING_OF_INTERNSHIPS',
  ADMINISTRATIVE_AUTOMATION = 'ADMINISTRATIVE_AUTOMATION',
  MATCHING_OF_INTERNSHIP_OFFERS_AND_QUALIFICATIONS = 'MATCHING_OF_INTERNSHIP_OFFERS_AND_QUALIFICATIONS',
  TRANSPARENCY_AND_VISIBILITY = 'TRANSPARENCY_AND_VISIBILITY',
  CONTINUOUS_IMPROVEMENT_OF_INTERNSHIP_EXPERIENCES = 'CONTINUOUS_IMPROVEMENT_OF_INTERNSHIP_EXPERIENCES',
  COMPLIANCE_WITH_REGULATORY_AND_ACCREDITATION_REQUIREMENTS = 'COMPLIANCE_WITH_REGULATORY_AND_ACCREDITATION_REQUIREMENTS'
}
export enum status {
  
  IN_PROGRESS='IN_PROGRESS',
  DROPPED='DROPPED',
  TREATED='TREATED',
  PENDING='PENDING'}
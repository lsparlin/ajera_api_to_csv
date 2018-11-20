
// This function defines the Csv columns (should have the same number of properties as projectForCsv!)
const csvColumnDefinition = [
  {id: 'id', title: 'Project ID'},
  {id: 'name', title: 'Name'},
  {id: 'type', title: 'Type'},
  {id: 'notes', title: 'Notes'},
  {id: 'projectManager', title: 'Project Manager'},
  {id: 'projectLead', title: 'Project Lead'},
  {id: 'tasks', title: 'Tasks'},
  {id: 'clients', title: 'Client'}
]

// This function is what converts the project schema to the important data we want out of it
function projectForCsv(apiProject) {
  const projectManager = apiProject.ProjectManager
  const projectLead = apiProject.PrincipalInCharge
  const clients = apiProject.InvoiceGroups.map( ig => ig.Client && ig.Client.Description).filter(client => client).join()

  return {
      id: apiProject.ID,
      name: apiProject.Description,
      type: apiProject.ProjectTypeDescription,
      notes: apiProject.Notes,
      projectManager: projectManager ? projectManager.FirstName + ' ' + projectManager.LastName : 'NO PROJECT MANAGER',
      projectLead: projectLead ? projectLead.FirstName + ' ' + projectLead.LastName :  ' NO PROJECT LEAD',
      tasks: '',
      clients: clients
  }
}

// ---------- Do not edit below this line ----------
module.exports = {
  csvColumnDefinition,
  projectForCsv
}

/* EXAMPLE SCHEMA
 				{
                "ProjectKey": 1,
                "LastModifiedDate": "2017-01-08 18:38:53.367 GMT-05:00 (Eastern Standard Time)",
                "ID": "15-0000",
                "Description": "Overhead/Indirect",
                "Status": "Hold",
                "SummarizeBillingGroup": false,
                "BillingDescription": "Overhead Project",
                "CompanyKey": 1,
                "CompanyDescription": "RLC, LLC",
                "ProjectTypeKey": 9,
                "ProjectTypeDescription": "INDIRECT",
                "DepartmentKey": 2,
                "DepartmentDescription": "Department",
                "BudgetedOverheadRate": 0,
                "ProjectManager": {
                    "EmployeeKey": 24,
                    "FirstName": "T",
                    "MiddleName": "",
                    "LastName": "Flewelling"
                },
                "PrincipalInCharge": {
                    "EmployeeKey": 25,
                    "FirstName": "Sarah",
                    "MiddleName": "Kathryn",
                    "LastName": "Doll"
                },
                "MarketingContact": null,
                "Location": "",
                "WageTableKey": null,
                "WageTableDescription": "",
                "IsCertified": false,
                "RestrictTimeEntryToResourcesOnly": false,
                "TaxState": "na",
                "TaxLocalKey": null,
                "TaxLocalDescription": "",
                "EstimatedStartDate": null,
                "EstimatedCompletionDate": null,
                "ActualStartDate": null,
                "ActualCompletionDate": "2014-12-18",
                "ApplySalesTax": false,
                "SalesTaxCode": "",
                "SalesTaxRate": 0,
                "RequireTimesheetNotes": true,
                "Notes": "",
                "HoursCostBudget": 0,
                "LaborCostBudget": 0,
                "ExpenseCostBudget": 0,
                "ConsultantCostBudget": 0,
                "PercentDistribution": 0,
                "IsFinalBudget": false,
                "BillingType": "Overhead",
                "RateTableKey": 0,
                "RateTableDescription": "",
                "LockFee": true,
                "Contacts": [],
                "InvoiceGroups": [
                    {
                        "InvoiceGroupKey": 1,
                        "Description": "",
                        "InvoiceFormatKey": null,
                        "InvoiceFormatDescription": "",
                        "InvoiceHeaderText": "",
                        "InvoiceFooterText": "",
                        "InvoiceScope": "",
                        "Notes": "",
                        "Phases": [
                            {
                                "PhaseKey": 2,
                                "LastModifiedDate": "2017-01-08 18:38:53.367 GMT-05:00 (Eastern Standard Time)",
                                "ID": "",
                                "Description": "Overhead Phase",
                                "Status": "Hold",
                                "IsBillingGroup": false,
                                "SummarizeBillingGroup": false,
                                "ProjectTypeKey": 9,
                                "ProjectTypeDescription": "INDIRECT",
                                "DepartmentKey": 2,
                                "DepartmentDescription": "Department",
                                "BudgetedOverheadRate": 0,
                                "ProjectManager": {
                                    "EmployeeKey": 24,
                                    "FirstName": "T",
                                    "MiddleName": "",
                                    "LastName": "Flewelling"
                                },
                                "PrincipalInCharge": {
                                    "EmployeeKey": 25,
                                    "FirstName": "Sarah",
                                    "MiddleName": "Kathryn",
                                    "LastName": "Doll"
                                },
                                "MarketingContact": null,
                                "WageTableKey": null,
                                "WageTableDescription": "",
                                "IsCertified": false,
                                "RestrictTimeEntryToResourcesOnly": false,
                                "TaxState": "na",
                                "TaxLocalKey": null,
                                "TaxLocalDescription": "",
                                "EstimatedStartDate": null,
                                "EstimatedCompletionDate": null,
                                "ActualStartDate": null,
                                "ActualCompletionDate": "2014-12-18",
                                "ApplySalesTax": false,
                                "SalesTaxCode": "",
                                "SalesTaxRate": 0,
                                "RequireTimesheetNotes": true,
                                "Notes": "",
                                "HoursCostBudget": 0,
                                "LaborCostBudget": 0,
                                "ExpenseCostBudget": 0,
                                "ConsultantCostBudget": 0,
                                "PercentDistribution": 0,
                                "IsFinalBudget": false,
                                "BillingType": "Overhead",
                                "RateTableKey": 0,
                                "RateTableDescription": "",
                                "LockFee": true,
                                "BillingDescription": "Overhead Phase",
                                "PhaseInvoiceText": "",
                                "LaborInvoiceText": "",
                                "ExpenseInvoiceText": "",
                                "ConsultantInvoiceText": "",
                                "Contacts": []
                            }
                        ]
                    }
                ]
            }
 */

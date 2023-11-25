// var myObj = {
//   0 : {
//       "Type of Policy": "TERM",
//       "Purpose Of Investment": "FAMILY SECURITY",
//       "policy Category": "KEYMAN",
//       "Proposer Name": "AMARNATH KASHIRAM PVT. LTD",
//       "DOB Proposer": "2000-01-16",
//       "Same as Proposer": "NO",
//       "Name Of Life Insured": "AMIT KHATRI",
//       "DOB Of life Insured": "1977-08-26",
//       "Company": "EDELWEISS",
//       "Policy no.": 4521524,
//       "Plan": "ZINDAGI PLUS WITH BETTER HALF",
//       "Plan Features": "LIFE COVERS FOR UNFORSEEN INCIDENTS",
//       "DOC": "2021-03-28",
//       "Age At Commencement": 43,
//       "Modal Premium": 56250,
//       "Mode": "ANNUAL",
//       "Annual Premium": 56250,
//       "Policy Term": 40,
//       "Premium Pay Term": 20,
//       "Paid Till Date": "2023-03-28",
//       "Renewal Date": "2024-03-28",
//       "Last Premium Pay year": "2040-03-28",
//       "End of Policy Term": "2041-03-28",
//       "Current Investment": 168750,
//       "Total Investment": 1125000,
//       "Better Half Benefit": {
//           "Better Half Benefit": "YES",
//           "Better Half Name": "MRS. KHATRI",
//           "Better Half Sum Assured": 7500000
//       },
//       "Nominee": "MRS. KHATRI",
//       "Nominee DOB": "1977-01-15",
//       "Nomination Percentage": 100,
//       "Assignee Details": {
//           "Assignee Name": "NA",
//           "Date of Assignment": "NA"
//       },
//       "Appointee Details": {
//           "Appointee Name": "NA",
//           "Appointee DOB": "NA"
//       },
//       "Sum Assured": 15000000,
//       "Death Benefit": "SUMASSURED",
//       "Death Benefit Value": 15000000,
//       "Rider 1": {
//           "Rider Name": "AD&D",
//           "Sum Assured": 1000000,
//           "Rider Validity": 2040,
//           "Feature (Hyperlink)": "HYPERLINK",
//           "Coverage 1": {
//               "Disease": "ACCIDENTAL DEATH & DISEMBERSEMENT",
//               "Disease Overview": "COVERS ACCIDENTAL POSSIBILITIES",
//               "Sum Assured": 1000000
//           }
//       },
//       "Maturity Benefit": "NA",
//       "Maturity Value": 20,
//       "Date Of Maturity": "2061-03-28",
//       "LI Age at Maturity": 83,
//       "Tax section(80(c))": "YES",
//       "Tax on claim": "NIL under section 1010(d)",
//       "Current Status": "INFORCE"
//   },
//   1 : {
//       "Type of Policy": "TERM WITH RETURN OF PREMIUM",
//       "Purpose Of Investment": "FAMILY SECURITY",
//       "policy Category": "INDIVIDUAL",
//       "Proposer Name": "AMIT KHATRI",
//       "DOB Proposer": "1977-08-26",
//       "Same as Proposer": "SAME",
//       "Name Of Life Insured": "AMIT KHATRI",
//       "DOB Of life Insured": "1977-08-26",
//       "Company": "EDELWEISS",
//       "Policy no.": 42500015,
//       "Plan": "ZINDAGI PLUS WITH BETTER HALF",
//       "Plan Features": "LIFE COVERS FOR UNFORSEEN INCIDENTS",
//       "DOC": "2021-03-28",
//       "Age At Commencement": 43,
//       "Modal Premium": "44280",
//       "Mode": "HALF YEARLY",
//       "Annual Premium": "88560",
//       "Policy Term": 35,
//       "Premium Pay Term": 20,
//       "Paid Till Date": "2023-03-28",
//       "Renewal Date": "2023-09-28",
//       "Last Premium Pay year": "2040-09-28",
//       "End of Policy Term": "2041-03-28",
//       "Current Investment": 265680,
//       "Total Investment": 1771200,
//       "Better Half Benefit": {
//           "Better Half Benefit": "NO",
//           "Better Half Name": "NA",
//           "Better Half Sum Assured": 0
//       },
//       "Nominee": "MR. HRIDAY KHATRI",
//       "Nominee DOB": "2008-01-18",
//       "Nomination Percentage": 100,
//       "Assignee Details": {
//           "Assignee Name": "NA",
//           "Date of Assignment": "NA"
//       },
//       "Appointee Details": {
//           "Appointee Name": "MRS. SHEETAL KHATRI",
//           "Appointee DOB": "1978-01-15"
//       },
//       "Sum Assured": 1000000,
//       "Death Benefit": "SUMASSURED",
//       "Death Benefit Value": 1000000,
//       "Rider 1": {
//           "Rider Name": "CRITICAL ILLNESS",
//           "Sum Assured": 2000000,
//           "Rider Validity": 2035,
//           "Feature (Hyperlink)": "HYPERLINK",
//           "Coverage 1": {
//               "Disease": "CANCER",
//               "Disease Overview": "COVERS SEVERITY OF CANCER",
//               "Sum Assured": 2000000
//           }
//       },
//       "Maturity Benefit": "RETURN OF ALL THE PAID PREMIUM - TAXES",
//       "Maturity Value": 1075825,
//       "Date Of Maturity": "2056-03-28",
//       "LI Age at Maturity": 78,
//       "Tax section(80(c))": "YES",
//       "Tax on claim": "NIL under section 1010(d)",
//       "IRR%": -0.5,
//       "Current Status": "INFORCE"
//   }
// };

// // console.log("*********************\n");

// // // Function to calculate the sum assured for a Life Time Sum Assured
// // console.log("LIFE-TIME SUM ASSURED\n");

// // function getSumAssuredForYear(policy, year) {
// //   const policyDOC = new Date(policy['DOC']);
// //   const policyMaturityDate = new Date(policy['Date Of Maturity']);
// //   const policySumAssured = policy['Sum Assured'];

// //   if (year >= policyDOC.getFullYear() && year < policyMaturityDate.getFullYear()) {
// //       return policySumAssured;
// //   }
// //   return 0;
// // }

// getMaturityForYear(policy, year) {
//   const policyMaturityDate = new Date(policy['Date Of Maturity']);
//   const policyMaturityValue = policy['Maturity Value'];

//   return year === policyMaturityDate.getFullYear() ? policyMaturityValue : 0;
// }

// const mydob = new Date(myObj[0]['DOB Of life Insured']);
// const thisYear = (new Date()).getFullYear();
// const result  =[]
// for (let year = thisYear; year <= thisYear + 100; year++) {
//   let totalMaturityValue = 0;
//   for (const policy of Object.values(myObj)) {
//       totalMaturityValue += getMaturityForYear(policy, year);
//   }
//   if (totalMaturityValue === 0) continue;
//   const ageDiff = year - mydob.getFullYear();
//   result.push({category:year+' - '+(ageDiff - 1),maturity:totalMaturityValue})
// }
// console.log(result)




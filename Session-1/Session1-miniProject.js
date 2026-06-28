function handlingPatient(arr){
    let treatedimmediately = [], missingData = [], normalTreated = [];
    for (let patient of arr){
        if (!patient.hasData){missingData.push(patient); continue;}
        if(patient.condition === "critical"){
            treatedimmediately.push(patient);
        } else {
            normalTreated.push(patient);
        }
        normalTreated.sort((a, b) => b.severity - a.severity);
    }
    return { treatedimmediately, missingData, normalTreated };
}
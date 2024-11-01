export interface IQuickViewData {
        "sku": string;
        "cpnt_classification": string;
        "title": string;
        "description": string;
        "userID": string;
        "personGUID": string;
        "personExternalID": string;
        "componentTypeID": string;
        "componentTypeDesc": string;
        "componentID": string;
        "componentLength": number;
        "revisionDate": number;
        "assignedDate": number;
        "requiredDate": number;
        "daysRemaining": number;
        "addUser": string;
        "addUserName": string;
        "addUserTypeLabelID": string;
        "scheduleID": string | null,
        "isRequired": boolean,
        "showInCatalog": boolean,
        "requirementTypeDescription": string;
        "requirementTypeId": string;
}
interface ICVRootScope extends angular.IRootScopeService {
    survey: Survey;
    surveyPages: any;
    surveyType: any;
    locationId: number;
    Locations: Array<string>;
    seemsToHaveInvitation: boolean;
    gotoThankyouPage: Function;
    metadata: IMetadata;
    languages: Array<IPlsObject>;
    hasMultipleLanguages: boolean;
    baseLang: string;
    langCode: string;
    airlineOp: string;
    pageId: number;
    emailDate?: string;
    campaignDate?: string;
    replaceToken?: any;
};

interface IPlsObject {
    id: string;
    title: string;
    name: string;
    flagImg: string;
    flagTitle: string;
}

interface IQuestionInfo {
    QuestId: number;
    Required: boolean;
}

interface ICustomervilleViewbag {
    SiteId?: number;
    LanguageCollections?: Array<any>;
    Questions?: Array<IQuestionInfo>;
    MultiChoiceAnswers?: any;
    EmailParams?: any;
    ExceptionMessage?: any;
    AppLanguages?: any;
    userLang?: string;
}

const Customerville: ICustomervilleViewbag = {
};

interface IPageControllerScope extends ng.IScope {
    questions: Array<Array<Question>>;
    pageInit: Function;
}
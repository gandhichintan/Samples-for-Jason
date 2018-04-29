interface IPageOptions {
    questions?: Array<Array<Question>>;
    title?: IInterpolableTranslation;
    header?: Array<IInterpolableTranslation>;
    texts?: Array<IInterpolableTranslation>;
    links?: Array<string>;
    urls?: Array<string>;
    footer?: Array<IInterpolableTranslation>;
    quote?: Quote;
    controller?: string;
    template?: string;
    visited?: boolean;
    canAdvance?: boolean;
    canRetreat?: boolean;
    visible?: boolean;
    cssClass?: string;
    environment?: string;
    autoAdvance?: boolean;
    surveyImage?: string;
}
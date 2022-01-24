import handlebars from 'handlebars';

interface ITemplateVariable {
    [key: string]: string | number;
}

interface IParseMailTemplate {
    template: string;
    variables: ITemplateVariable;
}

class handlebarsMailTemplate {
    public async parse(template, variables): Promise<string> {

    }
}
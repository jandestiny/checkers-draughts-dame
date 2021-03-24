class Validator
{
    constructor(options)
    {
        this.options = options || "default"
    }

    getOptions()
    {
        return this.options;
    }

    validateMove(source, target)
    {
        //TODO Implement validator
        return true;
    }
}

function validateMove()
{
    console.log("The move was validated.")
    return true;
}
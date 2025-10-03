const fields = [
    'title',
    'subtitle',
    'description',
    'thumbnail',
    'weight',
    'material',
    'handle',
    '*categories',
    '*collections',
    '*variants.calculated_price',
    '*variants.options',
    '*variants.options.option',
    '*images',
];

export default fields.join(',');
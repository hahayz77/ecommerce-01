export default {
    name: 'product',
    title: 'Product',
    type: 'document', 
    initialValue: {
        qty: 1,
      },
    fields:[
        {
            name: 'image',
            title: 'Image',
            type: 'array',
            of: [{ type: 'image' }],
            options: {
                hotspot: true
            }
        },
        {
            name: 'name',
            title: 'Name',
            type: 'string'
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            opitions:{
                source: 'name',
                maxLength: 90
            }
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number'
        },
        {
            name: 'qty',
            title: 'Quantity',
            type: 'number',
            hidden: true
        },
        {
            name: 'details',
            title: 'Details',
            type: 'string'
        }
    ]
}
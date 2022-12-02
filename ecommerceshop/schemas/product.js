export default {
    name: "product",
    title: "Product",
    type: "document",
    fields:[
        {
            name: "allImage",
            title: "AllIamge",
            type: "array",
            of: [{type: "image"}],
            options: {
                hotspot: true,
            }
        },
        {
            name: "colorImages",
            title: "colorImages",
            type: "array",
            of: [{type: "object", fields:[
                {    
                    name: "color",
                    title: "Color",
                    type: "string"
                    },
                    {
                        name: "allImage",
                        title: "AllIamge",
                        type: "array",
                        of: [{type: "image"}],
                        options: {
                            hotspot: true,
                        }
                    },
            ]}],
        },
        {    
        name: "name",
        title: "Name",
        type: "string"
        },
        {    
        name: "brand",
        title: "Brand",
        type: "string"
        },
        {
        name: "details",
        title: "Details",
        type: "text"
        },
        {
        name: "category",
        title: "Category",
        type: "string"
        },
        {
            name: "productId",
            title: "productId",
            type: "slug",
            options: {
                source: "name",
                maxLength: 90
            }
        },
        {    
            name: "colors",
            title: "Colors",
            type: "array",
            of: [{type: "string"}]
        },
        {    
            name: "price",
            title: "Price",
            type: "number"
        },
        {    
            name: "oldPrice",
            title: "Old Price",
            type: "number"
        },
        {    
            name: "discount",
            title: "Discount in %",
            type: "number"
        },
        {    
            name: "isSale",
            title: "Sale",
            type: "boolean"
        },
        {
            name: "isTrend",
            title: "Trend",
            type: "boolean"
        },
        {
            name: "isStock",
            title: "Stock",
            type: "boolean"
        }
    ],
    initialValue: {
        isTrend: false,
        isStock: true
      }
}
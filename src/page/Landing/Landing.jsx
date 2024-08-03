import React from 'react'

import Carousel from './../../Componet/Carousel/Carous.jsx'
import Category from './../../Componet/Category/Category.jsx'
import Product from './../../Componet/Product/Product.jsx'
import Layout from './../../Componet/Layout/Layout.jsx'

export default function Landing() {
  return (
    <Layout>

<Carousel/>
<Category/>
<Product/>
    </Layout>
  )
}

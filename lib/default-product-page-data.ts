import { defaultLocale } from './i18n/config.ts'
import { getDictionary } from './i18n/get-dictionary.ts'
import { fetchProductsData } from './products-db.ts'

type DefaultProductPageDataDependencies = {
  getDictionary: typeof getDictionary
  fetchProductsData: typeof fetchProductsData
}

const defaultDependencies: DefaultProductPageDataDependencies = {
  getDictionary,
  fetchProductsData,
}

export async function loadDefaultProductPageData(
  dependencies: DefaultProductPageDataDependencies = defaultDependencies,
) {
  const [dictionary, products] = await Promise.all([
    dependencies.getDictionary(defaultLocale),
    dependencies.fetchProductsData(defaultLocale),
  ])

  return { dictionary, products }
}

class Config {
    static BASE_URL="https://dashboarditemapi-605432afd181.herokuapp.com/"
    static loginUrl = BASE_URL+"login/";
    static createUserUrl = BASE_URL+"register/";
    static forgotPasswordUrl = BASE_URL+"password_reset/";
    static fetchItemsForSearchUrl = BASE_URL+"api/items/?search=";
    static getItemsByCategoryUrl = BASE_URL+"api/items/?category=$";
    static fetchCategoriesUrl = BASE_URL+"api/categories"
    static fetchTagsUrl = BASE_URL+"api/tags/";
    static fetchItemsUrl = BASE_URL+"api/items/";

}
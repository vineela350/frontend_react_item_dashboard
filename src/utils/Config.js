class Config {
    BASE_URL="https://dashboarditemapi-605432afd181.herokuapp.com/"
    static loginUrl = this.BASE_URL+"login/";
    static createUserUrl = this.BASE_URL+"register/";
    static forgotPasswordUrl = this.BASE_URL+"password_reset/";
    static fetchItemsForSearchUrl = this.BASE_URL+"api/items/?search=";
    static getItemsByCategoryUrl = this.BASE_URL+"api/items/?category=$";
    static fetchCategoriesUrl = this.BASE_URL+"api/categories"
    static fetchTagsUrl = this.BASE_URL+"api/tags/";
    static fetchItemsUrl = this.BASE_URL+"api/items/";

}
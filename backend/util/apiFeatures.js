class ApiFeatures {
  constructor(query, queryStr) {
    //(data,data To Be Searched)
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword, //$ sign is needed in mongoDB operator
            $options: "i", // To make case insensitive
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  // Here rating,price,category is filtered (just add the $ in gte and lte)
  filter() {
    // Removing the parameter in query on which basis we don't have to filter

    const queryStrCopy = { ...this.queryStr };

    const keyToBeRemoved = ["keyword", "page", "limit"];


    keyToBeRemoved.forEach((value) => {
      delete queryStrCopy[value];
    });

    // Filter for rating and price here we have to provide the range so we have to give gt(greater Than),lte(less than equal)
    // so add $ sign in the front of operator is necessary
  

    let newQuery = JSON.stringify(queryStrCopy);

    //Anything in b() will be replaced
    newQuery = newQuery.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (replaceValue) => `$${replaceValue}`
    ); 

    newQuery = JSON.parse(newQuery);


    this.query = this.query.find(newQuery);

    return this;
  }

  pagination(currPage) {
    const page = Number(this.queryStr.page) || 1;

    const skip = (page - 1) * currPage;

    this.query = this.query.limit(currPage).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures;

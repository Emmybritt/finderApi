const connection = require("../connection");
const Languages = require("../languages/Languages");


class Repo {
  constructor(tableName){
    this.tableName = tableName;
  }
  readSingle(id) {
    const sql = `SELECT * FROM ${this.tableName} WHERE id=?`;
    connection.query(sql, [id], (err, result) => {
      if (err) return {status: false, err}
      return {status: true, data:result[0] }
    })
  }

  readAllData() {
    const sql = `SELECT * FROM ${this.tableName}`;
    connection.query(sql, (err, result) => {
      if (err) return {status: false, err};
      let resp = {status: false, data: result}
      return resp;
    });
  }

  Create(data) {
    let columns = this.setTableColumns(data);
    let questionMark = this.setQuestionMark(data);
    console.log(columns, '-', this.setValues(data));
      const sql = `INSERT INTO ${this.tableName} (${columns}) VALUES(${this.setQuestionMark(data)})`;
      connection.query(sql, this.setValues(data), (err, result) => {
        if (!err) {
          console.log('There is error');
        }
        if (err) return {status: false, err}
        return {status: true, message: result}
      });
      // console.log(sql);
  }

  Delete(id) {
    if(!id) return {status: false, message: "To delete enter an id"};
    const sql = `DELETE FROM ${this.tableName} WHERE id=?`;
    connection.query(sql, [id], (err, result) => {
      if (err) return {status: false, message: err};
      return {status: true, message: Languages.create_success}
    })
  }

  setTableColumns(value){
    let myText = '';
    const data = Object.keys(value);
    if (data.length <= 0) return myText;
    let counter = 0;
    while (counter <= data.length - 1) {
      if (counter === data.length - 1) {
        myText += `${data[counter]}`;
        counter++;
        continue;
      }
      myText += `${data[counter]}, `;
      counter++;
    }
    return myText;
  }
  setQuestionMark(values) {
    let questionMark = '';
    let data = Object.values(values);
    if (data.length <=0) return questionMark;
    let count = 0;
    while (count <= data.length - 1) {
      if (count === data.length - 1) {
        questionMark += `?`;
        count++;
        continue;
      }
      questionMark += `?, `;
      count++;
    }
    return questionMark;
  }
  setValues(value, id = null) {
    let datas = Object.values(value);
    let arrayValues = [];
    datas.forEach((data) => {
      arrayValues.push(data);
    });
    // console.log(arrayValues);
    if (id !== null) datas.push(id);
    return arrayValues;
  }

  
}

module.exports = Repo;
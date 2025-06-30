import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080/api";

class HttpService {
  constructor() {
    console.log("HttpService 객체 생성");
  }

  async save(item) {
    console.log("save - item: ", item);
    const res = await axios.post("/memo", item);
    return res.data;
  }

  // get method 호출시, 2번째 인자는 객체를 보내고
  // 객체의 params 속성에 객체를 보내면
  // 자동으로 쿼리스트링 변환
  async getMemoList(params) {
    console.log("getMemoList - params: ", params);
    const res = await axios.get("/memo", { params });
    console.log("getMemoList - res.data: ", res.data);
    return res.data;
  }
  // async getMemoList(params) {
  // const res = axios.get("", { params });
  // 변수명과 키 값이 같으면 가능

  async findById(id) {
    console.log("findById - id: ", id);
    const res = await axios.get(`/memo/${id}`);
    console.log("findById - res.data: ", res.data);
    return res.data;
  }

  async modify(item) {
    console.log("modify - item: ", item);
    const res = await axios.put("/memo", item);
    return res.data;
  } // post, put은 형식이 거의 동일하다. 종류는 다름

  async deleteMemo(params) {
    console.log("deleteMemo - params: ", params);
    const res = await axios.delete("/memo", { params });
    return res.data;
  }
}

export default new HttpService();

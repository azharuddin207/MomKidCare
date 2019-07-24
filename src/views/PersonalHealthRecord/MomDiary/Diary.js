import React from 'react';
import {getOneMomDiary} from "../../../services/apiService";


class Diary extends React.Component{

  state = {
    title: "",
    text: "",
    diaryId: "",
    mood:'',
    file:'',
    redirect: false,
    link:''
  }

  componentDidMount() {
    const diaryId = this.props.match.params.id;
    console.log(diaryId)
    getOneMomDiary(diaryId)
      .then(({ data }) => {
        console.log(data);
        this.setState({ title:data.diary.title, text: data.diary.text,
          mood:data.diary.mood, diaryId:diaryId, link:data.diary.image});
      })
      .catch(err => {
        console.log(err);
        console.log('rejected')
      });
  }



  render(){
    let {title, text, mood, link} = this.state
    console.log(this.state)
    return(
      <React.Fragment>
        <div className="row">
          <div className="col-4">
            <img  src={link} alt="" width="100%"/>
          </div>
          <div className="col-8">
            <h5 style={{fontWeight: 600, marginTop:0, paddingTop:0}}>{title}</h5>
            <p>Mood: {mood}</p>
            <div dangerouslySetInnerHTML={{__html: text}}></div>
            {/*{text}*/}
            {/*<div className=""*/}
          </div>
        </div>

      </React.Fragment>
    )
  }
}


export default Diary

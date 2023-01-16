import React from "react";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { Chatbot } from "popcat-chatbot";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answers: [],
      question: "",
    };

    this.chatbot = new Chatbot()
      .setName("Chat Bot")
      .setGender("Male")
      .setOwner("EEEF");
  }

  handleInput = (ev) => {
    this.setState({ question: ev.target.value });
    console.log(ev.target.value);
  };

  componentDidMount() {
    if (localStorage.getItem("answer")) {
      this.setState({ answers: JSON.parse(localStorage.getItem("answer")) });
    }
    return;
  }

  addButton = (ev) => {
    this.chatbot.chat(this.state.question).then((answer) => {
      this.setState({
        answers: [
          ...this.state.answers,
          {
            answers: answer,
            questions: this.state.question,
            time: new Date(),
          },
        ],
      });
    });

    localStorage.setItem("answer", JSON.stringify(this.state.answers));
  };

  render() {
    return (
      <>
        <main>
          <input onChange={this.handleInput} type="text" />
          <button onClick={this.addButton}>Add</button>
          {this.state.answers.map((elem, i) => {
            return (
              <div key={elem.questions + i}>
                <div key={elem.questions + i}>{elem.questions}</div>
                <div key={elem.answers + i}>{elem.answers}</div>
              </div>
            );
          })}
        </main>
      </>
    );
  }
}

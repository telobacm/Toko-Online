import React from "react";
import "./ModalNama.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

export default class ModalNama extends React.Component {
  state = {
    open: false,
    nama1: "Reiner",
    nama2: "Braun",
    value1: "",
    value2: "",
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  gantinama = (e) => {
    console.log(e.target.value);
    this.setState({ value1: e.target.value });
  };

  gantinama2 = (e) => {
    console.log(e.target.value);
    this.setState({ value2: e.target.value });
  };

  onSave = () => {
    this.setState({
      nama1: this.state.value1,
      nama2: this.state.value2,
    });
    this.onCloseModal();
    localStorage.setItem("nama1", this.state.value1);
    localStorage.setItem("nama2", this.state.value2);
  };

  render() {
    return (
      <div className="umum">
        <br />
        <br />
        <h2 className="nmsy">
          Nama Saya <br />
          {this.state.nama1} {this.state.nama2}
        </h2>
        <button onClick={this.onOpenModal} className="button1">
          <span>Ganti Nama </span>
        </button>
        <br />
        <br />
        <img
          src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/67401945-34fc-46b8-8e8f-1982847277d4/ddba22b-2fad9d00-1d3f-4ec8-a65d-199a09dfa4e1.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvNjc0MDE5NDUtMzRmYy00NmI4LThlOGYtMTk4Mjg0NzI3N2Q0XC9kZGJhMjJiLTJmYWQ5ZDAwLTFkM2YtNGVjOC1hNjVkLTE5OWEwOWRmYTRlMS5naWYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ._-whxwEBEaTLWUvSWL80KTGiwpoy9dSPzXSRhfTAzeM"
          alt="Nyan Cat"
        ></img>
        <IkiModal
          open={this.state.open}
          nama1={this.state.nama1}
          nama2={this.state.nama2}
          onOpenModal={this.onOpenModal}
          onCloseModal={this.onCloseModal}
          gantinama={this.gantinama}
          gantinama2={this.gantinama2}
          onSave={this.onSave}
        />
      </div>
    );
  }
}

export class IkiModal extends React.Component {
  render() {
    const { open } = this.props;
    return (
      <Modal open={open} onClose={this.props.onCloseModal} className="modal">
        <div className="kepala">
          <h2>Masukkan Nama Anda di Sini:</h2>
        </div>
        <form>
          <input
            className="input"
            onChange={this.props.gantinama}
            placeholder="First Name"
            defaultValue={this.props.nama1}
          />
          <p />
          <input
            className="input"
            onChange={this.props.gantinama2}
            placeholder="Last Name"
            defaultValue={this.props.nama2}
          />
          <p />
        </form>
        <div>
          <button onClick={this.props.onSave} className="button2">
            Woghey
          </button>
          <button onClick={this.props.onCloseModal} className="button3">
            Nggak Jadi
          </button>
        </div>
      </Modal>
    );
  }
}

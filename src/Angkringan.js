import React, { Component } from "react";
import {
  Table,
  Col,
  Container,
  Row,
  Navbar,
  Button,
  ButtonGroup,
  Card,
  CardDeck,
  Modal,
  ListGroup,
  Badge,
} from "react-bootstrap";
import Cards from "./cards.json";
import Swal from "sweetalert2";

export default class Angkringan extends Component {
  state = {
    Cards,
    Bungkus: [],
    show: false,
    Total: "",
  };

  componentDidMount() {
    const bungkusLocal = localStorage.getItem("SaveBungkus");
    const Bungkus = bungkusLocal ? JSON.parse(bungkusLocal) : [];
    this.setState({ Bungkus });
    console.log("Komponen sampun dimuat");
  }
  componentDidUpdate() {
    console.log("Komponen sampun diapdet");
  }
  bukaModal = () => {
    this.setState({ show: true });
  };
  tutupModal = () => {
    this.setState({ show: false });
  };
  bungkusin = (value) => {
    const Bungkus = this.state.Bungkus;
    // buat Ngecek sudah adakah barang di Keranjang
    const i = Bungkus.findIndex((s) => s.id === value.id);
    if (i < 0) {
      Bungkus.push({
        id: value.id,
        nama: value.nama,
        harga: value.harga,
        jumlah: 1,
        total: value.harga,
      });
    } else {
      Bungkus[i].nama = value.nama;
      Bungkus[i].harga = value.harga;
      Bungkus[i].jumlah = Bungkus[i].jumlah + 1;
      Bungkus[i].total = Bungkus[i].jumlah * value.harga;
    }
    this.setState({ Bungkus });
    localStorage.setItem("SaveBungkus", JSON.stringify(Bungkus));
  };
  nggajadi = (value) => {
    const Bungkus = this.state.Bungkus;
    // buat Ngecek sudah adakah barang di Keranjang
    const i = Bungkus.findIndex((s) => s.id === value.id);
    if (Bungkus[i].jumlah <= 1) {
      Bungkus.splice(i, 1);
    } else {
      Bungkus[i].nama = value.nama;
      Bungkus[i].harga = value.harga;
      Bungkus[i].jumlah = Bungkus[i].jumlah - 1;
      Bungkus[i].total = Bungkus[i].jumlah * value.harga;
    }
    this.setState({ Bungkus });
    localStorage.setItem("SaveBungkus", JSON.stringify(Bungkus));
  };
  kosongkan = () => {
    this.setState({ Bungkus: [] });
    localStorage.removeItem("SaveBungkus");
    Swal.fire({
      title: "Pembayaran Berhasil !",
      text: "Pesanan anda akan segera dikirim.",
      imageUrl: "sukses-bayar.jpg",
      imageAlt: "Custom image",
      timer: 5000,
    });
  };

  totalan = () => {
    const total = this.state.Bungkus;
    const totalBungkus = total.reduce((sum, currentValue) => {
      return sum + currentValue.total;
    }, 0);
    this.setState({ Total: totalBungkus });
  };

  render() {
    const { Cards } = this.state;
    return (
      <Container fluid>
        <Navbar variant="dark" expand="lg">
          <Navbar.Brand className="ml-5">
            E-<strong>Angkringan ☕ </strong> App
          </Navbar.Brand>
        </Navbar>
        <Row>
          <Col className="mt-3 ml-5">
            <h4>
              <strong>Daftar Menu</strong>
            </h4>
            <hr />
            <Row>
              <ProductCards Cards={Cards} bungkusin={this.bungkusin} />
            </Row>
          </Col>
          <Bungkus
            Bungkus={this.state.Bungkus}
            bungkusin={this.bungkusin}
            nggajadi={this.nggajadi}
            bukaModal={this.bukaModal}
            totalan={this.totalan}
          />
          <Bayar
            show={this.state.show}
            Bungkus={this.state.Bungkus}
            tutupModal={this.tutupModal}
            bukaModal={this.bukaModal}
            Total={this.state.Total}
            // totalan={this.totalan}
            kosongkan={this.kosongkan}
          />
        </Row>
      </Container>
    );
  }
}

class ProductCards extends Component {
  render() {
    return (
      <CardDeck>
        {this.props.Cards.map((card, i) => (
          <Card key={i} className="shadow mt-3">
            <Card.Img variant="top" src={"images/" + card.gambar} />
            <Card.Body>
              <Card.Title>
                <strong>{card.nama}</strong>
              </Card.Title>
              <Card.Text>
                <strong>Rp {card.harga.toLocaleString()}</strong>
              </Card.Text>
              <Button
                className="krj"
                variant="primary"
                size="lg"
                block
                font-size="50pt"
                onClick={() => {
                  this.props.bungkusin(card);
                  Swal.fire({
                    position: "Center",
                    icon: "success",
                    title: "Nopo Maleh ?",
                    text: "✧*｡٩(ˊᗜˋ*)و✧*｡",
                    footer: "🧺 " + card.nama + " 🧺",
                    showConfirmButton: false,
                    timer: 1200,
                  });
                }}
              >
                + 🧺
              </Button>
            </Card.Body>
          </Card>
        ))}
      </CardDeck>
    );
  }
}

class Bungkus extends Component {
  render() {
    return (
      <Col md={4} className="mt-3 mr-5">
        <h4>
          <strong>Keranjang 🧺</strong>
          <hr />
        </h4>
        <ListGroup variant="flush">
          {this.props.Bungkus.map((value, i) => (
            <ListGroup.Item key={i}>
              <Row>
                <Col xs={2}>
                  <Badge pill variant="primary" className="badge">
                    {value.jumlah}
                  </Badge>
                </Col>
                <Col xs={4}>
                  <h5>
                    <strong>{value.nama}</strong>
                  </h5>
                  <p>Rp {value.harga.toLocaleString()}</p>
                </Col>
                <Col xs={2}>
                  <ButtonGroup vertical>
                    <Button onClick={() => this.props.bungkusin(value)}>+</Button>
                    <Button onClick={() => this.props.nggajadi(value)}>-</Button>
                  </ButtonGroup>
                </Col>
                <Col xs={4}>
                  <h4>
                    <strong className="float-lg-right"> Rp {value.total.toLocaleString()} </strong>
                  </h4>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>

        <Button
          className="byr"
          size="lg"
          block
          onClick={
            this.props.Bungkus.length > 0
              ? () => {
                  this.props.bukaModal();
                  this.props.totalan();
                }
              : () =>
                  Swal.fire({
                    position: "Center",
                    icon: "error",
                    title: "Pesan Dulu Gan",
                    text: "	┐(￣ヘ￣;)┌",
                    timer: 5000,
                  })
          }
        >
          Bayar 💸
        </Button>
      </Col>
    );
  }
}

class Bayar extends Component {
  render() {
    return (
      <Modal
        show={this.props.show}
        tutupModal={this.props.tutupModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            <h3>
              <strong>Pembayaran</strong>
            </h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table responsive="sm">
            <thead>
              <tr>
                <th>No.</th>
                <th>Nama Menu</th>
                <th>Jumlah</th>
                <th>Harga</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {this.props.Bungkus.map((value, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{value.nama} </td>
                  <td>{value.jumlah} </td>
                  <td>Rp {value.harga.toLocaleString()} </td>
                  <td>Rp {value.total.toLocaleString()} </td>
                </tr>
              ))}
            </tbody>
            <tbody>
              <tr>
                <td></td>
                <td>
                  <h4>
                    <strong>TOTAL</strong>
                  </h4>
                </td>
                <td></td>
                <td></td>
                <td>
                  <h4>
                    <strong>Rp {this.props.Total.toLocaleString()}</strong>
                  </h4>
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <h5>
            <strong>Bayar Dengan</strong>
          </h5>
          <Button
            className="ovo"
            onClick={() => {
              this.props.tutupModal();
              this.props.kosongkan();
            }}
          >
            OVO
          </Button>
          <Button
            className="shopee"
            onClick={() => {
              this.props.tutupModal();
              this.props.kosongkan();
            }}
          >
            ShopeePay
          </Button>
          <Button
            className="gopay"
            onClick={() => {
              this.props.tutupModal();
              this.props.kosongkan();
            }}
          >
            GoPay
          </Button>
          <Button
            className="dana"
            onClick={() => {
              this.props.tutupModal();
              this.props.kosongkan();
            }}
          >
            DANA
          </Button>
          <Button
            className="cash"
            onClick={() => {
              this.props.tutupModal();
              this.props.kosongkan();
            }}
          >
            Uang Cash
          </Button>
          <Button variant="secondary" onClick={this.props.tutupModal}>
            Batal
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

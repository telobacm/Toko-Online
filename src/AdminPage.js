import { Container, Form, Row, Col, Table, Button } from "react-bootstrap";
import { Component } from "react";

class AdminPage extends Component {
  state = {
    showModalEdit: false,
    showModalEditIndex: 0,
    Cards: JSON.parse(localStorage.getItem("Cards")),
  };
  componentDidMount() {}
  componentDidUpdate() {
    localStorage.setItem("Cards", JSON.stringify(this.state.Cards));
  }
  handleShow = () => {
    this.setState({ showModalEdit: true });
  };
  handleClose = () => {
    this.setState({ showModalEdit: false });
  };
  onEdit = (e, item) => {
    e.preventDefault();
    this.handleShow();
    const Cards = this.state.Cards;
    const i = Cards.findIndex((s) => s.nama === item.nama);
    this.setState({ showModalEditIndex: i });
  };
  onDelete = (e, item) => {
    e.preventDefault();
    const Cards = this.state.Cards;
    const i = Cards.findIndex((s) => s.nama === item.nama);
    Cards.splice(i, 1);
    this.setState({ Cards });
  };
  onAdd = (e) => {
    e.preventDefault();
    const Cards = this.state.Cards;
    Cards.push({
      nama: e.target.nama.value,
      harga: parseInt(e.target.harga.value),
      gambar: "./gambar/new-product.jpg",
    });
    this.setState({ Cards });
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.handleClose();
    const Cards = this.state.Cards;
    const i = this.state.showModalEditIndex;
    Cards[i].nama = e.target.nama.value;
    Cards[i].harga = e.target.harga.value;
    this.setState({ Cards });
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col xs={6} md={4}>
            <h2>Tambah Produk</h2>
            <Form>
              <Form.Group>
                {/* <Form.Control name="id" /> */}
                <Form.Control name="nama" placeholder="nama produk" />
                <Form.Control name="harga" placeholder="harga" />
                {/* <Form.Control name="gambar" /> */}
              </Form.Group>
              <Button type="submit">Tambahkan</Button>
            </Form>
          </Col>
          <Col xs={12} md={8}>
            <Table striped variant="dark">
              <thead>
                <tr>
                  <th>no.</th>
                  <th>Nama</th>
                  <th>Harga</th>
                  <th>Edit</th>
                  <th>Hapus</th>
                </tr>
              </thead>
              <tbody>
                {this.state.Cards.map((item, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.nama}</td>
                    <td>{item.harga.toLocaleString()}</td>
                    <td>
                      <Button onClick={(e) => this.onEdit(e, item)}>Edit</Button>
                    </td>
                    <td>
                      <Button onClick={(e) => this.onDelete(e, item)}>Hapus</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AdminPage;

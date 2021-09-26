import { useState } from "react";
import { Container, Form, Row, Button, Col, Card } from "react-bootstrap";
import { Service } from "../services/service";

export default function App() {
  const [uploadFile, setUploadFile] = useState(undefined);
  const [uploadResponse, setUploadResponse] = useState(undefined);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!uploadFile) {
      alert("Please select a file");
      return;
    }

    try {
      const res = await Service.checkRealType(uploadFile);
      setUploadResponse(res.data);
    } catch (err) {
      alert("Error when uploading file");
    }
  };

  const handleSelectFile = (e) => {
    setUploadFile(e.target.files[0]);
  };

  return (
    <Container>
      <Row style={{ marginTop: 50 }}>
        <Col md={{ span: 8, offset: 2 }}>
          <Card>
            <Card.Body>
              <Card.Title>Upload File Demo</Card.Title>
              <Form onSubmit={handleUpload}>
                <Form.Group controlId="formFileLg" className="mb-3">
                  <Form.Label>Select file to upload</Form.Label>
                  <Form.Control
                    type="file"
                    size="md"
                    onChange={handleSelectFile}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Upload
                </Button>
                {uploadFile ? (
                  <Card style={{ marginTop: 20 }}>
                    <Card.Header>Selected File</Card.Header>
                    <Card.Body>
                      <Card.Text>
                        <p>File name: {uploadFile.name}</p>
                        <p>Type: {uploadFile.type}</p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ) : null}
                {uploadResponse ? (
                  <Card style={{ marginTop: 20 }}>
                    <Card.Header>Response Type</Card.Header>
                    <Card.Body>
                      <Card.Text>
                        {
                          JSON.stringify(uploadResponse, null, 4)
                        }
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ) : null}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

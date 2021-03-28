import * as React from "react";
import { exportToJsonFile } from "../../services/files";
import {
  createMock,
  getStore,
  updateStateStore,
  updateStore,
} from "../../services/store";
import styled from "styled-components";
import { Button } from "../atoms";
import { IMockResponseRaw } from "../../interface/mock";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Separator = styled.div`
  display: flex;
  align-items: center;
  margin: 16px 0;
  hr {
    flex-grow: 2;
  }
  p {
    margin: 0 12px;
  }
`;

const Error = styled("p")<{ show: boolean; error: boolean }>`
  ${({ error }) =>
    error && `color: ${({ theme }) => theme.colors.alert} !important;`}
  height: 16px;
  margin-top: 8px;
  opacity: 0;
  ${({ show }) => show && "opacity: 1;"}
`;

const PseduInput = styled.input``;

interface IProps {
  onImportSuccess: () => void;
}

const FS = ({ onImportSuccess }: IProps) => {
  const [status, setStatus] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const exportMocks = React.useCallback(() => {
    setLoading(true);
    getStore().then((x) => {
      exportToJsonFile(x.store.mocks);
      setLoading(false);
    });
  }, []);

  const handleFileChange = (event) => {
    setError(false);
    let file = event.target.files[0];

    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function () {
      if (typeof reader.result !== "string") {
        setStatus(
          "Not a valid file, if you think it's an error, please try again it will resolve by itself."
        );
        setError(true);
        return;
      }

      const newMocks = JSON.parse(reader.result) as IMockResponseRaw[];
      // check if new mocks have all the required fields
      const isInvalid = newMocks.some((mock) => {
        if (!mock.delay || !mock.url || !mock.status) {
          return true;
        }
      });
      if (isInvalid) {
        setError(true);
        setStatus(
          "Few of the mock have missing properties, it can be delay, url or status"
        );
        return;
      }

      const newMocksToUpdate = [];
      const newMocksToAdd = [];
      getStore().then((prevStore) => {
        const oldMocks = prevStore.store.mocks || [];
        newMocks.forEach((mock) => {
          if (!mock.id) {
            newMocksToAdd.push(createMock(mock));
          } else {
            const id = mock.id;
            const matchingMock = oldMocks.find((m) => m.id === id);
            if (matchingMock) {
              newMocksToUpdate.push(createMock(mock));
            } else {
              newMocksToAdd.push(createMock(mock));
            }
          }
        });

        newMocksToUpdate.forEach((m) => {
          prevStore.store = updateStateStore("edit", m, prevStore.store, {});
        });

        newMocksToAdd.forEach((m) => {
          prevStore.store = updateStateStore("add", m, prevStore.store, {});
        });

        updateStore(prevStore.store).then(() => {
          setTimeout(() => onImportSuccess(), 100);
          setStatus("Mocks succesfully imported from the file!");
          setLoading(false);
        });
      });
    };

    reader.onerror = function () {
      setStatus(reader.error.message);
    };
  };

  return (
    <Wrapper>
      <Container>
        <Button
          background="primary"
          color="white"
          onClick={exportMocks}
          disabled={loading}
        >
          Export Mocks
        </Button>
        <Separator>
          <hr />
          <p>or</p>
          <hr />
        </Separator>
        <PseduInput
          disabled={loading}
          onChange={handleFileChange}
          type="file"
          id="mock"
          name="mock"
          accept="application/JSON"
        />
        <Error error={error} show={loading || !!status}>
          {loading ? "Processing, please wait" : status}
        </Error>
      </Container>
    </Wrapper>
  );
};

export default React.memo(FS);

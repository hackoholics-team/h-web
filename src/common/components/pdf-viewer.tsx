import { FC, useRef, useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import {
  Backdrop,
  Typography,
  LinearProgress,
  SxProps,
  Box,
} from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';
import { FlexBox } from './flex-box';
import { useToggle } from '../hooks';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { NOOP_FN } from '../utils/noop';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

export const ErrorMessage = () => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <ErrorIcon style={{ fontSize: 40 }} />
    <Typography sx={{ fontSize: '14px' }}>
      Error occured on reading the pdf
    </Typography>
  </Box>
);

export type PdfViewerProps = {
  sx?: SxProps;
  pdf: string;
};

const removeLayerProps = {
  renderTextLayer: false,
  renderAnnotationLayer: false,
};

export const PdfViewer: FC<PdfViewerProps> = ({ sx, pdf }) => {
  const pdfRef = useRef(null);
  const { value: showAsBackdrop, toggleValue: toggleShowAsBackdrop } =
    useToggle();
  const {
    value: isLoading,
    setTrue: startLoading,
    setFalse: stopLoading,
  } = useToggle(true);
  const [pagesInfo, setPagesInfo] = useState({
    numberOfPages: 0,
    currentPage: 1,
  });

  const onShowAsBackdrop = () => {
    toggleShowAsBackdrop();
    startLoading();
  };

  useEffect(() => {
    startLoading();
  }, [pdf, startLoading]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setPagesInfo((prev) => ({
      ...prev,
      numberOfPages: numPages,
    }));
  };
  const pages = new Array(pagesInfo.numberOfPages)
    .fill(0)
    .map((_page, index) => (
      <Page
        width={700}
        key={index}
        onLoadSuccess={
          index === pagesInfo.numberOfPages - 1 ? stopLoading : NOOP_FN
        }
        pageNumber={index + 1}
        {...removeLayerProps}
      />
    ));

  return (
    <Box ref={pdfRef} sx={{ width: '700px', ...sx }}>
      {isLoading && <LinearProgress />}
      <Document
        file={pdf}
        onLoadSuccess={onDocumentLoadSuccess}
        error={<ErrorMessage />}
        noData={<Typography>En attente du document ...</Typography>}
        loading={<Typography>Chargement du document ...</Typography>}
      >
        <Page
          pageNumber={1}
          width={
            (pdfRef.current && (pdfRef.current as any).clientWidth - 50) || 700
          }
          onClick={onShowAsBackdrop}
          onLoadSuccess={stopLoading}
          {...removeLayerProps}
        />
        <Backdrop open={showAsBackdrop} onClick={onShowAsBackdrop}>
          <Box>
            <FlexBox sx={{ p: 2, bgcolor: 'red' }}></FlexBox>
            <FlexBox
              sx={{
                flexDirection: 'column',
                gap: 2,
                maxHeight: 'calc(100vh - 50px)',
                mb: '20px',
                overflowY: 'scroll',
              }}
            >
              {pages}
            </FlexBox>
          </Box>
        </Backdrop>
      </Document>
    </Box>
  );
};

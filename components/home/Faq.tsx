import {
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@material-ui/core";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import map from "lodash/map";
import { useEffect, useState } from "react";

interface FaqInterface {
  summary: string;
  details: string;
}

const Faq = () => {
  const [Faqs, setFaqs] = useState<FaqInterface[]>([]);
  const getFaqs = async () => {
    const _faqs = await import("./data/faqs.json");
    setFaqs(_faqs);
  };
  useEffect(() => {
    getFaqs();
  }, []);
  return (
    <Grid
      id="faq"
      style={{
        padding: 20,
        marginTop: 50,
        marginBottom: 50,
      }}
      container
      spacing={2}
    >
      <Grid
        style={{
          marginTop: 50,
          marginBottom: 50,
        }}
        item
        xs={12}
        sm={12}
        md={12}
      >
        <Typography align="center" variant="h5" component="h5" gutterBottom>
          الأسئلة الشائعة
        </Typography>
      </Grid>
      {map(Faqs, (faq: FaqInterface, index: number) => {
        return (
          <Grid key={index} item xs={12} sm={12} md={12}>
            <Accordion
              TransitionProps={{
                unmountOnExit: true,
              }}
              style={{
                background: "transparent",
                boxShadow: "none",
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  style={{
                    fontWeight: 650,
                  }}
                >
                  {faq.summary}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="secondary">{faq.details}</Typography>
              </AccordionDetails>
            </Accordion>
            <Divider />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Faq;

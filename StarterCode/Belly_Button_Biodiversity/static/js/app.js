function buildMetadata(sample) {
  // @TODO: Complete the following function that builds the metadata panel
  // Use d3.json to fetch the metadata for a sample
  // create the function sampleMetadata that will hold metadata samples when pulled and test with console.log
  d3.json(`/metadata/${sample}`).then(function(sampleMetadata) {
    console.log(sampleMetadata);
    // Use d3 to select the panel with id of #sample-metadata (line 31 of the html code)
    var infobox = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata (gives a hard refresh, otherwise will save this data)
      infobox.html("");
    // Use Object.entries to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    // pull key and values
    Object.entries(sampleMetadata).forEach(([key, value]) => {
      infobox.append('p').text(`${key}: ${value}`);
    })
  })
 }
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
 function buildCharts(sample) {
  // @TODO: Use d3.json to fetch the sample data for the plots
  d3.json(`/samples/${sample}`).then(function(samplePie) {
    console.log(samplePie);
    // create variables for ids, values, and hovertext labels
    var out_ids = samplePie.otu_ids;
    var sample_values = samplePie.sample_values;
    var otu_labels = samplePie.otu_labels;
    // create pie using variables
    //.slice will grab from 0 up to the 10th position
    var trace1 = [{
      labels: out_ids.slice(0, 10),
      values: sample_values.slice(0, 10),
      hovertext: otu_labels.slice(0, 10),
      type: 'pie'
    }];
    var layout = {
      title: "Belly Button Pie Chart",
    };
    Plotly.newPlot("pie", trace1, layout);
    // @TODO: Build a Bubble Chart using the sample data
    // 'markers' will display the data as markers
    // picnic colorscale(color scheme) from plotly
    var trace2 = [{
      x: out_ids,
      y: sample_values,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: out_ids,
        colorscale: 'Picnic'
      }
    }];
    var layout2 = {
      title: "<b>Belly Button Bubble Chart</b>",
    };
    Plotly.newPlot("bubble", trace2, layout2);
  })
    // @TODO: Build a Bubble Chart using the sample data
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
 }
 function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
 }
 function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
 }
 // Initialize the dashboard
 init();
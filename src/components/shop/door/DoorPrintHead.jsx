import React from "react";

function PrintHead({ info }) {
  return (
    <thead className="print-table-head">
      <tr>
        <th colSpan={3} rowSpan={3}>
          <img
            src="https://adroitmanufacturing.allmoxy.com/data/header/Adroit_logo_3d-01-01.png"
            alt="adroit-manufacturing-logo"
            width={120}
            height={50}
          />
        </th>
        <th colSpan={3}>Adroit</th>
        <th className="listhead">Document</th>
        <th className="listhead">ORDER ACKNOWLEDGE</th>
        <th colSpan={2}>BILLING TO:</th>
        <th colSpan={3}>SHIPPING TO:</th>
      </tr>
      <tr>
        <th colSpan={3}>Adroit LOGISTICS</th>
        <th className="needBorder">N</th>
        <th className="needBorder">95-23000555</th>
        <th colSpan={2} rowSpan={5} className="needBorder">
          {info.billing}
        </th>
        <th colSpan={3} rowSpan={5} className="needBorder">
          {info.shipping}
        </th>
      </tr>
      <tr>
        <th colSpan={3}>859 39th St</th>
        <th className="needBorder">Date</th>
        <th className="needBorder">{info.date}</th>
      </tr>
      <tr>
        <th colSpan={3}>www.adroit.com</th>
        <th colSpan={3}>BROOKLYN</th>
        <th className="needBorder">YOUR REFERENCE</th>
        <th className="needBorder">041723</th>
      </tr>
      <tr>
        <th colSpan={3}>customer.service@adroit.com</th>
        <th colSpan={3}>Tel.(718)431-0089</th>
        <th className="needBorder">Weight(Lb.)</th>
        <th className="needBorder">5431.03</th>
      </tr>
      <tr>
        <th colSpan={3} rowSpan={2}>
          com.: 517 LUIS VAZQUEZ
        </th>
        <th colSpan={3}>Fax.(718)431-0060</th>
        <th className="needBorder">Volume(m3)</th>
        <th className="needBorder">5431.03</th>
      </tr>
      <tr>
        <th colSpan={3}>-- Operation insured by MAPFRE</th>
        <th className="needBorder">Bulks</th>
        <th className="needBorder">9407</th>
        <th colSpan={6}>Tel:+11234567890</th>
      </tr>
      <tr>
        <th className="text-center listhead">ITEM#</th>
        <th className="text-center listhead">PANEL ID</th>
        <th className="text-center listhead">DESCRIPTION</th>
        <th className="text-center listhead">PT</th>
        <th className="text-center listhead">HEIGHT</th>
        <th className="text-center listhead">WIDTH</th>
        <th className="text-center listhead">DEPTH</th>
        <th className="text-center listhead">QUANTITY</th>
        <th className="text-center listhead">PRICE</th>
        <th className="text-center listhead">DISCOUNTS</th>
        <th className="text-center listhead">TOTAL</th>
        <th className="text-center listhead">LB.</th>
        <th className="text-center listhead">M3</th>
      </tr>
    </thead>
  );
}
export default PrintHead;

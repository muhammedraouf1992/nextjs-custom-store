"use client";

import { useSearchParams } from "next/navigation";
import React, { useTransition } from "react";
import { handlePaymentAction } from "./actions/handlePaymentAction";

const crypto = require("crypto");
const ThankyouPage = () => {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const amount_cents = searchParams.get("amount_cents");
  const created_at = searchParams.get("created_at");
  const currency = searchParams.get("currency");
  const error_occured = searchParams.get("error_occured");
  const has_parent_transaction = searchParams.get("has_parent_transaction");
  const integration_id = searchParams.get("integration_id");
  const is_3d_secure = searchParams.get("is_3d_secure");
  const is_auth = searchParams.get("is_auth");
  const is_capture = searchParams.get("is_capture");
  const is_refunded = searchParams.get("is_refunded");
  const is_standalone_payment = searchParams.get("is_standalone_payment");
  const is_voided = searchParams.get("is_voided");
  const owner = searchParams.get("owner");
  const pending = searchParams.get("pending");
  const success = searchParams.get("success");
  const objId = searchParams.get("id");
  const orderId = searchParams.get("order");
  const sourceDataPan = searchParams.get("source_data.pan");
  const sourceDataSubtype = searchParams.get("source_data.sub_type");
  const sourceDataType = searchParams.get("source_data.type");
  const hmac = searchParams.get("hmac");

  const string =
    amount_cents +
    created_at +
    currency +
    error_occured +
    has_parent_transaction +
    objId +
    integration_id +
    is_3d_secure +
    is_auth +
    is_capture +
    is_refunded +
    is_standalone_payment +
    is_voided +
    orderId +
    owner +
    pending +
    sourceDataPan +
    sourceDataSubtype +
    sourceDataType +
    success;

  const HMAC_SECRET = "6DD302FDFACB7D0CFE0C4EDDA207EA55";

  const dataToHash = string;

  const Hashedhmac = crypto.createHmac("sha512", HMAC_SECRET);

  Hashedhmac.update(dataToHash);

  const calculatedHmac = Hashedhmac.digest("hex");

  console.log("Calculated HMAC:", calculatedHmac);
  if (calculatedHmac === hmac) {
    console.log("HMAC is valid.");
    if (!pending && success) {
      startTransition(async () => {
        await handlePaymentAction();
      });
    }
  } else {
    console.log("HMAC is invalid.");
  }

  return (
    <div className="container">
      {success ? <p>payment success</p> : <p>payment failed</p>}
    </div>
  );
};

export default ThankyouPage;

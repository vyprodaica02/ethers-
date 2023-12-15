/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Wallet } from "ethers";
import * as XLSX from "xlsx";

function App() {
  const [numAccounts, setNumAccounts] = useState(1);
  const [createdAccounts, setCreatedAccounts] = useState([]);

  const handleCreateAccounts = async () => {
    try {
      const accounts = [];
      for (let i = 0; i < numAccounts; i++) {
        const wallet = Wallet.createRandom();
        const address = wallet.address;
        const privateKey = wallet.privateKey;

        accounts.push({
          address,
          privateKey,
          mnemonic: wallet.mnemonic.phrase,
        });
      }
      setCreatedAccounts(accounts);
    } catch (error) {
      console.error("Lỗi khi tạo tài khoản mới:", error);
    }
  };

  const handleExportToExcel = () => {
    // Tạo một workbook mới
    const wb = XLSX.utils.book_new();

    // Tạo một worksheet
    const ws = XLSX.utils.json_to_sheet(createdAccounts);
    console.log(ws);
    // Thêm worksheet vào workbook
    XLSX.utils.book_append_sheet(wb, ws, "Tài Khoản");

    // Xuất file Excel
    XLSX.writeFile(wb, "created_accounts.xlsx");
  };

  return (
    <div className="mt-4">
      <label>
        <input
          className="mb-4 p-3 border border-purple-500"
          type="number"
          value={numAccounts}
          onChange={(e) => setNumAccounts(e.target.value)}
        />
      </label>

      <button
        className="p-2 bg-purple-500 border rounded-2xl"
        onClick={handleCreateAccounts}
      >
        Tạo Tài Khoản Mới
      </button>
      <button
        className="ml-4 p-2 bg-green-500 border rounded-2xl"
        onClick={handleExportToExcel}
        disabled={createdAccounts.length === 0}
      >
        Xuất Excel
      </button>

      {createdAccounts.length > 0 && (
        <div className="border border-indigo-600 rounded-sm mt-4">
          <h2>Danh sách tài khoản đã tạo:</h2>
          {createdAccounts.map((account, index) => (
            <div className="border border-red-500 rounded-lg m-2" key={index}>
              <p>Địa chỉ tài khoản: {account.address}</p>
              <p>Private Key: {account.privateKey}</p>
              <p>Mnemonic: {account.mnemonic}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

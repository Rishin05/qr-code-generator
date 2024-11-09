"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, LayoutGrid, Link, Mail } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { QRCodeSVG } from "qrcode.react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { toPng } from "html-to-image";
import {saveAs } from "file-saver";

function QRCodeGenerator() {
  const [url, setUrl] = React.useState("");
  const [color, setColor] = React.useState("#ffffff");
  const [bgcolor, setBgColor] = React.useState("#000000");
  const [logo, setLogo] = React.useState<string | null>(null);
  const [logoFile, setLogoFile] = React.useState<File | null>(null);
  const [qrType, setQrType] = React.useState("link");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleDownload = (type: "png" | "svg") => {
    const qrCodeElm = document.getElementById("qr-code");

    if (qrCodeElm){
      if(type=== "png"){
        toPng(qrCodeElm).then((dataUrl) => {
          saveAs(dataUrl, "qr-code.png");
        }).catch((error)=>{
          console.log("Error Generating QR code",error)
        })
      }else if(type=== "svg"){
        const svgElem = qrCodeElm.querySelector("svg");

        if(svgElem){
          const saveData = new Blob([svgElem.outerHTML], {
            type: "image/svg+xml;charset=uft-8",
          });
          saveAs(saveData,"qr-code.svg")
        }
      }
    }
  }

  const handleEmailInput = () => {
    const mailToLink = `mailto:${email}?subject=${subject}&body=${encodeURIComponent(message)}`;

    setUrl(mailToLink)
  }



  return (
    <div className="relative z-10 mx-6 flex max-w-[1250px] w-full min-h-[700px] h-full">
      <Card className="flex-1 flex flex-col w-full h-auto mx-auto bg-[#fed0bb]/80 backdrop-blur-md shadow-md border-4 border-[#fcb9b2]/40 rounded-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-[#8c2f39]">
            QR code Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="h-full flex flex-col md:flex-row gap-8">
            <div className=" flex-1 space-y-6">
              <Tabs
                defaultValue="link"
                className="space-y-6"
                onValueChange={(val) => setQrType(val)}
              >
                <TabsList className="h-10 w-full grid-cols-2 grid bg-[#8c2f39] text-lg">
                  <TabsTrigger value="link" className="text-white font-bold">
                    <Link className="w-4 mr-2" />
                    Link
                  </TabsTrigger>
                  <TabsTrigger value="email" className="text-white font-bold">
                    <Mail className="w-4 mr-2" />
                    Email
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="link">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="font-semibold text-[#8c2f39]">URL</Label>
                      <Input id="url" type="text" value={url} onChange={(e)=> setUrl(e.target.value)} placeholder="https://example.com" className="w-full border-2 focus:border-[#b23a48]/80 border-[#fcb9b2] rounded-md outline-none focus-visible:ring-0 placeholder:text-gray-600 bg-transparent focus:bg-transparent" />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="email">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label  htmlFor="email" className="font-semibold text-[#8c2f39]">Email</Label>
                      <Input id="email" type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Enter email" className="w-full bg-transparent border-2 focus:border-[#b23a48]/80 border-[#fcb9b2] rounded-md outline-none focus-visible:ring-0 placeholder:text-gray-600 focus:bg-transparent" />
                    </div>
                    <div className="space-y-2">
                      <Label  htmlFor="subject" className="font-semibold text-[#8c2f39]">Subject</Label>
                      <Input id="subject" type="text" value={subject} onChange={(e)=> setSubject(e.target.value)} placeholder="Enter Subject" className="w-full border-2 focus:border-[#b23a48]/80 border-[#fcb9b2] rounded-md outline-none focus-visible:ring-0 placeholder:text-gray-600 bg-transparent focus:bg-transparent" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="font-semibold text-[#8c2f39]">Message</Label>
                      <Textarea id="message" value={message} onChange={(e)=> setMessage(e.target.value)} placeholder="Enter Message" className="w-full border-2 focus:border-[#b23a48]/80 border-[#fcb9b2] rounded-md outline-none focus-visible:ring-0 placeholder:text-gray-600 bg-transparent focus:bg-transparent resize-none h-24" />
                    </div>
                    <Button className="py-7 px-8 bg-[#8c2f39] font-bold rounded-md uppercase hover:bg-transparent border-2 border-[#fcb9b2] hover:border-[#8c2f39] hover:border-2 hover:text-[#8c2f39]" onClick={handleEmailInput}> Generate Email QR Code</Button>
                    </div>
                </TabsContent>
              </Tabs>
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <div className="space-y-2 flex-1">
                    <Label className="font-semibold text-[#8c2f39]">QR Code Color</Label>
                    <div className="flex items-center gap-1">
                      <div className="relative w-12 flex-1 h-12 rounded-md border-2 border-[#fcb9b2]" style={{backgroundColor: color}}>
                      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
                      </div>
                      <Input type="text" value={color} onChange={(e) => setColor(e.target.value)} className="flex-1 border-2 h-12 bg-transparent  focus:border-[#b23a48]/80 border-[#fcb9b2] rounded-md outline-none focus-visible:ring-0 placeholder:text-gray-600"/>
                    </div>
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label className="font-semibold text-[#8c2f39]">Background Color Color</Label>
                    <div className="flex items-center gap-1">
                      <div className="relative w-12 flex-1 h-12 rounded-md border-2 border-[#fcb9b2]" style={{backgroundColor: bgcolor}}>
                      <input type="color" value={bgcolor} onChange={(e) => setBgColor(e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
                      </div>
                      <Input type="text" value={bgcolor} onChange={(e) => setBgColor(e.target.value)} className="flex-1 border-2 h-12 bg-transparent  focus:border-[#b23a48]/80 border-[#fcb9b2] rounded-md outline-none focus-visible:ring-0 placeholder:text-gray-600"/>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo" className="font-bold text-[#8c2f39]"> Logo </Label>
                  <Input type="file" id="logo"  accept="image/*"onChange={(e: any)=> { 
                    if(e.target.files && e.target.files[0]) {
                      setLogoFile(e.target.files[0]);

                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setLogo(reader.result as string);
                        
                      };reader.readAsDataURL(e.target.files[0]);
                    }
                  }} 
                  className="w-full border-2 bg-transparent focus:border-[#b23a48]/80 border-[#fcb9b2] rounded-md outline-none focus-visible:ring-0 placeholder:text-gray-600"></Input>
                </div>
              </div>
            </div>
            <div className=" relative flex-1 bg-[#8c2f39] rounded-lg flex flex-col justify-center space-y-6">
              <span>
                <LayoutGrid  className="w-8 h-8 absolute top-4 right-4 text-white"/>
              </span>
                <div className="flex justify-center p-8" id="qr-code">
                  <div className="relative ">
                    <QRCodeSVG value={url} size={256} fgColor={color} bgColor={bgcolor} imageSettings={logo ? {src: logo, height:50, width:50, excavate:true}: undefined}/>
                    {logo && (<img src={logo} alt="logo" className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8"/>)}
                  </div>
                </div>
                <div className="flex justify-center space-x-4">
                  <Button variant="outline"
                  onClick={()=> handleDownload("png")}>
                    <Download className="w-4 h-4 mr-2" />
                    Download PNG
                  </Button>
                  <Button variant="outline"
                  onClick={()=> handleDownload("svg")}>
                    <Download className="w-4 h-4 mr-2" />
                    Download SVG
                  </Button>
                </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default QRCodeGenerator;

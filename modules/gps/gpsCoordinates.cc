#include <string>
#include <node.h>
#include <stdio.h>
#include <stdlib.h>
#include <gps.h>

extern "C" {
	char * getGPSResult();
}

using namespace v8;

void getCoordinates(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = Isolate::GetCurrent();
  HandleScope scope(isolate);
  Local<Object> obj = Object::New(isolate);
  obj->Set(String::NewFromUtf8(isolate, "coordinates"), String::NewFromUtf8(isolate,getGPSResult()) );
  args.GetReturnValue().Set(obj);

}

void init(Handle<Object> exports, Handle<Object> module) {
  NODE_SET_METHOD(module, "exports", getCoordinates);
}
NODE_MODULE(gpsCoordinates, init)


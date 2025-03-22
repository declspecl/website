import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function Home() {
  return (
    <div className="bg-red-500">
      <Card>
        <CardHeader>
          <CardTitle>This is a card</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="default">Some button</Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <p>some dialog content</p>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}

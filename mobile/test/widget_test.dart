import 'package:flutter_test/flutter_test.dart';
import 'package:just_shine_booking/main.dart';

void main() {
  testWidgets('renders booking app shell', (WidgetTester tester) async {
    await tester.pumpWidget(const JustShineBookingApp());

    expect(find.text('Just Shine Cleaning Services'), findsOneWidget);
    expect(find.text('Home'), findsOneWidget);
    expect(find.text('Quote'), findsOneWidget);
    expect(find.text('Bookings'), findsOneWidget);
    expect(find.text('Chat'), findsOneWidget);
    expect(find.text('Profile'), findsOneWidget);
  });
}
